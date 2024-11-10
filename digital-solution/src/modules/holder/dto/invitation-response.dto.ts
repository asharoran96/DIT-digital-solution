import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from "class-validator";
import { InvitationResponse } from "../../verifier/enum/invitation-response.enum";

export class InvitationResponseDto{
    @IsString()
    @IsNotEmpty()
    credentialId: string

    @IsString()
    @IsNotEmpty()
    verifierId: string

    @IsString()
    @IsNotEmpty()
    status: InvitationResponse
}