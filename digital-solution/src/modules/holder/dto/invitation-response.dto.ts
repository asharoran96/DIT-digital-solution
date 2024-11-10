import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from "class-validator";
import { InvitationResponse } from "../../verifier/enum/invitation-response.enum";
import { ApiProperty } from "@nestjs/swagger";

export class InvitationResponseDto{
    @ApiProperty({
        type: String,
        description: "the Id for the credential that the holder will accept or reject",
        default: "4e2f5fce-b963-46b4-be86-005a196c90fb"
    })
    @IsString()
    @IsNotEmpty()
    credentialId: string

    @ApiProperty({
        type: String,
        description: "add the verifier id who will sent the invitation to the holder and want to respond to",
        default: "e2799e1d-1c6d-416d-9368-39bc72e922a3"
    })
    @IsString()
    @IsNotEmpty()
    verifierId: string
    @ApiProperty({
        type: String,
        description: "status for this credential",
        default: "accept",
        enum: ['accept', 'reject']
    })
    @IsString()
    @IsNotEmpty()
    status: InvitationResponse
}