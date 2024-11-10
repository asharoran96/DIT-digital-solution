import { InvitationStatus } from "src/modules/verifier/enum/iveitation-status.enum";
import { NotificationGateway } from "src/modules/notification/notification.gateway";
import { VerifierService } from "src/modules/verifier/service/verifier.service";
import { CredentialsRepository } from "../repository/credentail.repository";
import { IssuerService } from "src/modules/issuer/service/issuer.service";
import { HolderService } from "src/modules/holder/service/holder.service";
import { ICrdRecordSchema } from "../interface/crd-record.interface";
import { CreateCredentialsDto } from "../dto/credential.dto";
import { Injectable, OnModuleInit, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.DEFAULT })
export class CredentialsService implements OnModuleInit {
    constructor(private readonly credRepo: CredentialsRepository
        , private readonly issuerService: IssuerService,
        private readonly holderService: HolderService,
        private readonly verifierService: VerifierService,
        private readonly notificationGateway: NotificationGateway
    ) { }
    onModuleInit() {
        this.startMonitoringExpired();
    }
    create(createCrdDto: CreateCredentialsDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const _existIssuer = await this.issuerService.getById(createCrdDto.issuerId);
                const _existHolder = await this.holderService.getHolderById(createCrdDto.subject);
                const _existVerifier = await this.verifierService.getVerifierById(createCrdDto.verifierId)
                const issuerNewCrd = await this.credRepo.create(createCrdDto);
                await this.issuerService.addCrdToIssuer(issuerNewCrd.issuerId, issuerNewCrd.id);
                await this.verifierService.addCrdToVerificationArr(createCrdDto.verifierId, createCrdDto.subject, issuerNewCrd.id);
                resolve({ message: 'The credential created successfully', data: issuerNewCrd });
            } catch (error: any) {
                reject(error)
            }
        })
    }
    getBySubject(subject: string) {
        return this.credRepo.getBySubject(subject);
    }

    changeCrdStatus(credId: string, status: InvitationStatus) {
        return this.credRepo.changeCrdStatus(credId, status);
    }
    startMonitoringExpired() {
        setInterval(() => {
            const credentials = this.credRepo.loadAll();
            const now = new Date();
            const pendingCrds = credentials.filter((crd) => crd.status === InvitationStatus.Pending);
            pendingCrds.forEach((credential: ICrdRecordSchema) => {
                if (new Date(credential.expiryDate) < now) {
                    const { verifierId, subject, id } = credential;
                    this.changeCrdStatus(credential.id, InvitationStatus.Expired)
                    this.verifierService.changeCrdStatus(verifierId, subject, id, InvitationStatus.Expired);
                    this.notificationGateway.sendRevocationEvent(credential.subject);
                } else { console.log(`no expired crd till now ${now}, id ${credential.id}`) };
            });
        }, 30000); // Check every 30s
    }
}