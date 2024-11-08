import { CreateVerifierReqDto } from "src/modules/verifier/dto/create-request.dto";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as fs from 'fs'
import path from "path";
import { idGenerator } from "src/utils/id-generator.util";
@Injectable()
export class VerifierRepository{
    private readonly verifierFilePath = path.join(__dirname, '../../..', 'data/verifier.data.json');
    private getAll() {
        if (!fs.existsSync(this.verifierFilePath)) return [];
        const verifiersData = fs.readFileSync(this.verifierFilePath, 'utf8');
        return JSON.parse(verifiersData);
    }
    private saveVerifier(verifiers: CreateVerifierReqDto[]) {
        fs.writeFileSync(this.verifierFilePath, JSON.stringify(verifiers, null, 2));
        return;
    }
    create(verifierData: CreateVerifierReqDto) {
        const verifiers: CreateVerifierReqDto[] = this.getAll();
        const existVerifier = this.existVerifierById(verifierData.id);
        if (existVerifier) throw new ConflictException(`Verifer already exist with this ${verifierData.id} id`);
        const newVerifier: CreateVerifierReqDto = { id: idGenerator(), name: verifierData.name, verifications: [] };
        verifiers.push(newVerifier);
        this.saveVerifier(verifiers);
        return newVerifier;
    }
    existVerifierById(id: string) {
        const verfiers: [] = this.getAll()
        const targetVerfier = verfiers.find((verifier: CreateVerifierReqDto ) => (String(verifier.id) === String(id)));
        if (!targetVerfier) throw new NotFoundException(`Verfier not found with this id ${id}`);
        return targetVerfier;
    }
    // push a crd
    //change status
}