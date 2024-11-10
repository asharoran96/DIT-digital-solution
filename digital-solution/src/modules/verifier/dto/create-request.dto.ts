import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateVerifierReqDto{
    @ApiProperty({
        type: String,
        description: "write the verifier name",        
        default: 'verifierTest'
    })
    @IsString()
    name:string;
}