import { InvitationResponse } from "../../../modules/verifier/enum/invitation-response.enum";
import { InvitationStatus } from "../../../modules/verifier/enum/iveitation-status.enum";
import { VerifierService } from "../../../modules/verifier/service/verifier.service";
import { InvitationResponseDto } from "../dto/invitation-response.dto";
import { forwardRef, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { HolderRepository } from "../repository/holder.repository";
import { CreateHolderReqDto } from "../dto/create-request.dto";
import { NotificationGateway } from "../../../modules/notification/notification.gateway";
import { CredentialsService } from "../../../modules/credential/service/credentail.service";

@Injectable()
export class HolderService {
    constructor(private readonly holderRepo: HolderRepository,
        @Inject(forwardRef(() => CredentialsService))
        private readonly credService: CredentialsService,
        private readonly verifierService: VerifierService,
        private readonly notificationGateWay: NotificationGateway
   ) { }

    public create(createHolderReqDto: CreateHolderReqDto) {
        return this.holderRepo.create(createHolderReqDto.name)
    }
    getHolderById(holderId: string) {
        return this.holderRepo.getHolderById(holderId);
    }
    receiveInvitation(verifierId: string, holderId: string, crdId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const isCrdExpired = this.verifierService.isExpired(verifierId, holderId, crdId)
                if (isCrdExpired) throw new RequestTimeoutException('this credential is expired')
                await this.holderRepo.addCrdToHolder(holderId, crdId);
                await this.verifierService.changeCrdStatus(verifierId, holderId, crdId, InvitationStatus.Pending);
                resolve(`Holder with ${holderId} received the invitation successfully`);
            } catch (error) {
                reject(error)
            }
        })
    }
    responseOnInvitation(holderId: string, invitationResponseDto: InvitationResponseDto) {
        const { verifierId, credentialId }: any = invitationResponseDto
        const isCrdExpired = this.verifierService.isExpired(verifierId, holderId, credentialId)
        if (isCrdExpired) throw new RequestTimeoutException('this credential is expired')
        else {

            if (invitationResponseDto.status === InvitationResponse.Accept) {
                this.verifierService.changeCrdStatus(verifierId, holderId, credentialId, InvitationStatus.Accepted)
                this.notificationGateWay.sendCredentialVerified(holderId, verifierId, credentialId)
                return { message: 'This crd status updated to Accepted successfully' }
            } else {
                this.verifierService.changeCrdStatus(verifierId, holderId, credentialId, InvitationStatus.Rejected)
                this.credService.changeCrdStatus(credentialId, InvitationStatus.Rejected)
                return { message: 'This crd status updated to rejected successfully' }
            }
        }
    }
}