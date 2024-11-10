import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { IVerificationArrRecord } from "../interface/verification-record.interface";
import { ICreateVerifier } from "../interface/create-verifier.interface";
import { InvitationStatus } from "../enum/iveitation-status.enum";
import { idGenerator } from "src/utils/id-generator.util";
import * as path from "path";
import * as fs from 'fs';

@Injectable()
export class VerifierRepository {
    private readonly verifierFilePath = path.join(__dirname, '../../../..', 'data/verifier.data.json');
    private getAll() {
        if (!fs.existsSync(this.verifierFilePath)) return [];
        const verifiersData = fs.readFileSync(this.verifierFilePath, 'utf8');
        return verifiersData ? JSON.parse(verifiersData) : [];
    }
    private saveVerifier(verifiers: ICreateVerifier[]) {
        fs.writeFileSync(this.verifierFilePath, JSON.stringify(verifiers, null, 2));
        return;
    }
    create(verifierName: string) {
        const verifiers: ICreateVerifier[] = this.getAll();
        const existVerifier = this.existVerifierByName(verifierName);
        if (existVerifier) throw new ConflictException(`Verifer already exist with this ${verifierName} name`);
        const newVerifier: ICreateVerifier = { id: idGenerator(), name: verifierName, verifications: [] };
        verifiers.push(newVerifier);
        this.saveVerifier(verifiers);
        return newVerifier;
    }
    existVerifierByName(name: string) {
        const verfiers: [] = this.getAll();
        const targetVerfier = verfiers.find((verifier: ICreateVerifier) => (String(verifier.name) === String(name)));
        if (!targetVerfier) return false;
        else return targetVerfier;
    }
    existVerifierById(id: string) {
        const verfiers: [] = this.getAll()
        const targetVerfier = verfiers.find((verifier: ICreateVerifier) => (String(verifier.id) === String(id)));
        if (!targetVerfier) throw new NotFoundException(`Verifier not found with this id ${id}`);
        else return targetVerfier;
    }
 addCrdToVerifier(verifierId: string, holderId: string, crdId: any) {
        try {
            const getHolder = this.getHolderById(verifierId, holderId)
            if (getHolder.existingHolder) {
                getHolder.existingHolder.credentials.push({ crdId, status: InvitationStatus.Received });
            } else {
                const verificationRecord = this.addToVerificationArr(holderId, crdId, InvitationStatus.Received);
                getHolder._existVerifier.verifications.push(verificationRecord);
            }
            this.saveVerifier(getHolder.verifiers);
            return true;
        } catch (error) {
            return error
        }
    }

    addToVerificationArr(holderId: string, crdId: string, crdStatus: string): IVerificationArrRecord {
        return {
            holderId,
            credentials: [{ crdId, status: crdStatus }]
        };
    }
    getHolderById(verifierId: string, holderId: string) {
        const verifiers: ICreateVerifier[] = this.getAll();
        const _existVerifier: ICreateVerifier = verifiers.find((verifier: ICreateVerifier) =>
            String(verifier.id).trim() === verifierId.trim()
        );
        if (_existVerifier) {
            const existingHolder = _existVerifier.verifications.find((verification: IVerificationArrRecord) =>
                verification.holderId === holderId
            );
            if (existingHolder) return { existingHolder, _existVerifier, verifiers };
             else  return { existingHolder: null, _existVerifier, verifiers };
        } else throw new NotFoundException('Verifier with this Id does not exist');
    }
    updateCrdStatus(verifierId: string, holderId: string, crdId: string, newStatus: InvitationStatus): boolean {
        const getHolder = this.getHolderById(verifierId, holderId)
        const credential = getHolder.existingHolder.credentials.find((crd) => crd.crdId === crdId);
        if (credential) {
            credential.status = newStatus;
            this.saveVerifier(getHolder.verifiers);
            return true;
        } else throw new NotFoundException('Credential with this Id does not exist for the given holder');
    }
    isCrdExpired(verifierId: string, holderId: string, crdId: string): boolean {
        const getHolder = this.getHolderById(verifierId, holderId)
        const credential = getHolder.existingHolder.credentials.find((crd) => crd.crdId === crdId);
        if (credential) {
            if (credential.status === InvitationStatus.Expired) return true;
            else return false;
        } else throw new NotFoundException('Credential with this Id does not exist for the given holder')
    }

}