import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateHolderReqDto{
    // @IsString()
    // id:string;
    // @IsArray()
    // credentials:Object;
    @IsString()
    @IsNotEmpty()
    name:string;
    // @IsString()
    // walletKey:string
}