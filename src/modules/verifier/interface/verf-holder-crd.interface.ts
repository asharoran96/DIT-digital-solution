export interface IholderVerificationRecord{
    id: string, 
    type: string,
    subject: string,
    issuerId: string,
    creationDate: Date,
    expiryDate: Date,
    status: string
}