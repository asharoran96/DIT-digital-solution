import { IssuerService } from "src/modules/issuer/service/issuer.service";
import { CreateCredentialsDto } from "../dto/credential.dto";
import { CredentialsRepository } from "../repository/credentail.repository";
import { IissuerDataRecored } from "src/modules/issuer/interface/issue-data-schems.interface";
import { Injectable } from "@nestjs/common";


@Injectable()
export class CredentialsService{
    constructor(private readonly credRepo: CredentialsRepository
     ,private readonly issuerService: IssuerService
    ){}

    create(createCrdDto: CreateCredentialsDto){
        const issuerNewCrd =  this.credRepo.create(createCrdDto);
         // the subject id should be the holder id HOLDER
         // check if that holder id is exist 
         // push them to the verifier array with {crd id , status: {expired , accepted, rejected , pending}, holderid}
         // after creating new verifier record in the verifier will send invitation to holder with the (get holder by id and send him to update the crd status)
         // push them to the holder crd array (crd id , date, status)
         // if the crd is expired will throw that this crd is expired to the api response and change the status of this crd
         // if holder accept this ( tigger the socket to send crd data to verifer (update status)) and holder should receive crd was verified
         // 
         // push the crd to the holder trigger the verifier ( to send notifications ) to the holder through the socket for the crd id 
       

    }
    getBySubject(subject:string){
        return this.credRepo.getBySubject(subject)
    }
    //verify the expiryDate 
}