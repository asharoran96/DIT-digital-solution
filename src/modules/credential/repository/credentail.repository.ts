import { ICrdRecordSchema } from "../interface/crd-record.interface";
import { CreateCredentialsDto } from "../dto/credential.dto";
import { idGenerator } from "src/utils/id-generator.util";
import { ConflictException, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs';

@Injectable()
export class CredentialsRepository{
    private readonly crdFilePath = path.join(__dirname, "../../..", 'data/credential.data.json');

    private loadAll(){
        if(!fs.existsSync(this.crdFilePath)) return []
        const crds = fs.readFileSync(this.crdFilePath, 'utf8');
        return JSON.parse(crds);
    }
    private saveNewCrd(crds: ICrdRecordSchema[]){
        fs.writeFileSync(this.crdFilePath, JSON.stringify(crds, null, 2));
        return;
    }
    private checkExistById(id:string){
        const crds: ICrdRecordSchema[] = this.loadAll()
        const _existCrd = crds.find((crd:ICrdRecordSchema)=>(String(crd.id).trim() === String(id).trim()));
        if(_existCrd) return false;
        else return true;
    }
    public create(createdCrdDto: CreateCredentialsDto){
        const crds: ICrdRecordSchema[] = this.loadAll();
        const creationDate = new Date();
        const expiryDate = new Date(creationDate.getTime() + 15 * 60000); //after 15 min expired
        const newCrd: ICrdRecordSchema = { ...createdCrdDto,id: idGenerator(),creationDate, expiryDate};
        crds.push(newCrd);
        this.saveNewCrd(crds);
        return newCrd;

    }
    getBySubject(subject: string){
        const crds: ICrdRecordSchema[] = this.loadAll();
        const _existCrds = crds.find((crd:ICrdRecordSchema)=>(String(crd.subject).trim() === String(subject).trim()));
        return _existCrds;
    }
}