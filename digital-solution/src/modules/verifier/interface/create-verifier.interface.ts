import { IVerificationArrRecord } from "./verification-record.interface";

export interface ICreateVerifier{
    id:string,
    name:string,
    verifications: IVerificationArrRecord[]
}