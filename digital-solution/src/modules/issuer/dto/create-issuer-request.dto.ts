import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateIssuerDTO{
    @ApiProperty({
        type: String,
        description: "write the issuer company name",        
        default: 'companyTest'
    })
    @IsString()
    @IsNotEmpty()
    companyName: string
}