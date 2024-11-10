import { ICrdRecordSchema } from "src/modules/credential/interface/crd-record.interface";

export interface IissuerDataRecored{
    id: String,
    companyName: String,
    issuedCredentials: Array<String>
}