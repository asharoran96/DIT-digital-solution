import { IsDate, IsEnum, IsString } from "class-validator";
import { CrdTypes } from "../enum/crd-type.enum";

export class CreateCredentialsDto{
    @IsString()
    issuerId: string; // will be pushed in crd Arr in issuer data

    @IsString()
    subject: string; // is the FK with Holder id

    @IsString()
    verifierId: string

    @IsEnum(["ID", "PASSPORT", "BOARDING_PASS"], {
        message: 'Valid type required ["ID", "PASSPORT", "BOARDING_PASS"]'
    })
    type: CrdTypes
}