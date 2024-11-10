import * as path from "path";
import * as fs from 'fs'
import { CreateIssuerDTO } from "../dto/create-issuer-request.dto";
import { idGenerator } from "src/utils/id-generator.util";
import { IissuerDataRecored } from "../interface/issue-data-schems.interface";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";


@Injectable()
export class IssuerRepository {
    //TODO: change the path for the files to be in env file --> more easier using docker 
    private readonly issuersFilePath = path.join(__dirname, '../../../..', 'data/issuer.data.json');

    private getAllIssuer() {
        if (!fs.existsSync(this.issuersFilePath)) return [];
        const issuersData = fs.readFileSync(this.issuersFilePath, 'utf8');
        return issuersData? JSON.parse(issuersData): [];
    }
    private saveIssuer(issuers: IissuerDataRecored[]) {
        fs.writeFileSync(this.issuersFilePath, JSON.stringify(issuers, null, 2));
        return;
    }
    private getIssuerByCompanyName(companyName: string) {
        const issuers: IissuerDataRecored[] = this.getAllIssuer()
        const targetIssuer = issuers.find((issuer: IissuerDataRecored) => (String(issuer.companyName).trim() === String(companyName).trim()));
        if (targetIssuer) return false;
        else return true;
    }
    createIssuer(issuerData: CreateIssuerDTO) {
        const issuers: IissuerDataRecored[] = this.getAllIssuer();
        const existIssuer = this.getIssuerByCompanyName(issuerData.companyName);
        if (!existIssuer) throw new ConflictException(`Issuer already exist with this ${issuerData.companyName} company name`);
        const newIssuers: IissuerDataRecored = { id: idGenerator(), companyName: issuerData.companyName, issuedCredentials: [] };
        issuers.push(newIssuers);
        this.saveIssuer(issuers);
        return newIssuers;
    }
    getIssuerById(id: string) {
        const issuers: [] = this.getAllIssuer()
        const targetIssuer = issuers.find((issuer: IissuerDataRecored) => (String(issuer.id) === String(id)));
        if (!targetIssuer) throw new NotFoundException(`Issuer not found with this id ${id}`);
        else return targetIssuer;
    }
    //push crd to issuer arr
    addCrdToIssuer(issuerId: string , crdId: string){
        const issuers = this.getAllIssuer()
        const _existIssuer: IissuerDataRecored = issuers.find((issuer) => String(issuer.id).trim() === issuerId.trim());
        if(_existIssuer) {
            _existIssuer.issuedCredentials.push(crdId)
            this.saveIssuer(issuers)
            return true
        }
        else throw new NotFoundException('Issuer with this Id not exist')
    }
}