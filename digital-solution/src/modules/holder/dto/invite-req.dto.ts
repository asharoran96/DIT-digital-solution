import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class InviteReqDto{
    @ApiProperty({
        type: String,
        description: "add the verifier id who will send this invitation to the holder",
        default: "e2799e1d-1c6d-416d-9368-39bc72e922a3"
    })
    @IsString()
    verifierId: string;
    @ApiProperty({
        type: String,
        description: "add the holder that you want him to accept or reject the crd",
        default: "135a8e9e-8579-494a-b469-73f8186ff7a6"
    })
    @IsString()
     holderId: string;
     @ApiProperty({
        type: String,
        description: "the Id for the credential that you want to send the holder",
        default: "4e2f5fce-b963-46b4-be86-005a196c90fb"
    })
     @IsString()
     credentialId: string
}