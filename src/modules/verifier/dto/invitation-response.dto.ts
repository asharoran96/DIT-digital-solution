import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from "class-validator";
import { InvitationStatus } from "../enum/invitation-response.enum";

export class InvitationResponseDto{
    @IsObject()
    @IsNotEmptyObject()
    credentialData: Object;
    
    @IsString()
    @IsNotEmpty()
    status: InvitationStatus
}