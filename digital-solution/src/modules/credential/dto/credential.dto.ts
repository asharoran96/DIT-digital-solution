import { IsDate, IsEnum, IsString } from "class-validator";
import { CrdTypes } from "../enum/crd-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCredentialsDto{
    @ApiProperty({
        type: String,
        description: "issuer id who want to create this credentail",
        default: "0193f348-63d4-4a91-9d68-5250ebf2b35a"
    })
    @IsString()
    issuerId: string; // will be pushed in crd Arr in issuer data

    @ApiProperty({
        type: String,
        description: "[Subject mean the HolderId ] add the holder that you want him to accept or reject the crd",
        default: "135a8e9e-8579-494a-b469-73f8186ff7a6"
    })
    @IsString()
    subject: string; // is the FK with Holder id

    @ApiProperty({
        type: String,
        description: "add the verifier id who will sent the invitation to the holder and want to respond to",
        default: "e2799e1d-1c6d-416d-9368-39bc72e922a3"
    })
    @IsString()
    verifierId: string

    @ApiProperty({
        type: String,
        description: 'Type for this credential',
        default: "PASSPORT",
        enum: ["ID", "PASSPORT", "BOARDING_PASS"]
    })
    @IsEnum(["ID", "PASSPORT", "BOARDING_PASS"], {
        message: 'Valid type required ["ID", "PASSPORT", "BOARDING_PASS"]'
    })
    type: CrdTypes
}