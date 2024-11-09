import { Injectable } from "@nestjs/common";
import { CreateVerifierReqDto } from "../dto/create-request.dto";
import { InvitationResponseDto } from "../dto/invitation-response.dto";
import { VerifierRepository } from "../repository/verifier.repository";

@Injectable()
export class VerifierService {
    constructor(private readonly verifierRep: VerifierRepository){}
    // create a verifier
    create(createReqDto: CreateVerifierReqDto) { 
        return this.verifierRep.create(createReqDto.name)
    }
    //recive crd from issuer push the created crd to verifier array after issuer send with status ( pending, accepte =>verified, rejected, received, expired)
    // send invitation to the holder by pushing the crd to holder crd list 
    responseOnInvitation(invitationResponseDto: InvitationResponseDto) {
        // export the verifer invitation arr and change the status on his array 
        // change the status on verification array ,, change it on the holder crd arr // send the event to the socket
    }
    addCrdToVerificationArr(){
        // get the first one 
    }
}