import { Injectable } from "@nestjs/common";
import { CreateIssuerDTO } from "../dto/create-issuer-request.dto";
import { IssuerRepository } from "../repository/issuer.repository";

@Injectable()
export class IssuerService {
  constructor(private readonly issuerRepository: IssuerRepository) { }
  create(createIssuerData: CreateIssuerDTO) {
    return this.issuerRepository.createIssuer(createIssuerData);
  }
  getById(id: string) {
    return this.issuerRepository.getIssuerById(id);
  }
  addCrdToIssuer(issuerId: string, crdId:string){
    return this.issuerRepository.addCrdToIssuer(issuerId, crdId);
  }
}