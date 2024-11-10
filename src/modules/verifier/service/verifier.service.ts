import { ICrdRecordSchema } from "src/modules/credential/interface/crd-record.interface";
import { InvitationResponseDto } from "../../holder/dto/invitation-response.dto";
import { VerifierRepository } from "../repository/verifier.repository";
import { CreateVerifierReqDto } from "../dto/create-request.dto";
import { Injectable } from "@nestjs/common";
import { InvitationStatus } from "../enum/iveitation-status.enum";

@Injectable()
export class VerifierService {
    constructor(private readonly verifierRep: VerifierRepository){}
    // create a verifier
    create(createReqDto: CreateVerifierReqDto) { 
        return this.verifierRep.create(createReqDto.name)
    }
    //recive crd from issuer push the created crd to verifier array after issuer send with status ( pending, accepte =>verified, rejected, received, expired)
    // send invitation to the holder by pushing the crd to holder crd list 

    getVerifierById(id:string){
        return this.verifierRep.existVerifierById(id);
    }
    addCrdToVerificationArr(verifierId: string, holderId: string , crdId:string){
        return this.verifierRep.addCrdToVerifier(verifierId, holderId, crdId);
        // or get the first one 
    }
    changeCrdStatus(verifierId:string, holderId:string, crdId:string, invitationStatus: InvitationStatus){
        return this.verifierRep.updateCrdStatus(verifierId,holderId, crdId, invitationStatus)
    }
    isExpired(verifierId:string, holderId:string, crdId:string,){
        return this.verifierRep.isCrdExpired(verifierId,holderId, crdId);
    }
}