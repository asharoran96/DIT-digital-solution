import { IsNotEmpty, IsString } from "class-validator";

export class CreateIssuerDTO{
    @IsString()
    @IsNotEmpty()
    companyName: string
}