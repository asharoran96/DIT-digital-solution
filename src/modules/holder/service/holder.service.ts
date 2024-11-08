import { Injectable } from "@nestjs/common";
import { InvitationResponseDto } from "../../verifier/dto/invitation-response.dto";
import { HolderRepository } from "../repository/holder.repository";
import { CreateHolderReqDto } from "../dto/create-request.dto";

@Injectable()
export class HolderService{
    constructor(private readonly holderRepo: HolderRepository){}
    // create the holder
    public create(createHolderReqDto: CreateHolderReqDto){}
    addCrdToHolder(){}
    //check if the holder is exist
    getHolderById(){}
    // response on invitation
    receiveInvitation(data:any){
         // push crd on holder array
         //change the status on verified that is pending
    }

}