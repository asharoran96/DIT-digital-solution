import { IsDate, IsEnum, IsString } from "class-validator";
import { CrdTypes } from "../enum/crd-type.enum";

export class CreateCredentialsDto{
    @IsString()
    id: string; // will be pushed in crd Arr in issuer data

    @IsString()
    subject: string; // is the FK with Holder id

    // @IsString()
    // expiryDate: string;

    @IsEnum(["ID", "PASSPORT", "BOARDING_PASS"], {
        message: 'Valid type required'
    })
    type: CrdTypes
}