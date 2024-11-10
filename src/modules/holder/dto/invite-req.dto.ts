import { IsString } from "class-validator";

export class InviteReqDto{
    @IsString()
    verifierId: string;
    @IsString()
     holderId: string;
     @IsString()
     credentialId: string
}