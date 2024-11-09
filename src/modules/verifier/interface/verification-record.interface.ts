import { IholderVerificationRecord } from "./verf-holder-crd.interface";

export interface IVerificationArrRecord{
    holderId: string,
    credentials: IholderVerificationRecord[]
}