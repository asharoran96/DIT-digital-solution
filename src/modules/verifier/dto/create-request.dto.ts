import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateVerifierReqDto{
    @IsString()
    @IsNotEmpty()
    id:string;

    @IsString()
    name:string;

    @IsArray()
    verifications: Object
}