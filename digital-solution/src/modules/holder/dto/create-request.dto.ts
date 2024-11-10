import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateHolderReqDto{
    // @IsString()
    // id:string;
    // @IsArray()
    // credentials:Object;
    @ApiProperty({
        type: String,
        description: "name for the holder",
        default: "holderTest"
    })
    @IsString()
    @IsNotEmpty()
    name:string;
    // @IsString()
    // walletKey:string
}