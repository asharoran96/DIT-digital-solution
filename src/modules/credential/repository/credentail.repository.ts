import { ICrdRecordSchema } from "../interface/crd-record.interface";
import { CreateCredentialsDto } from "../dto/credential.dto";
import { idGenerator } from "src/utils/id-generator.util";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs';
import { InvitationStatus } from "src/modules/verifier/enum/iveitation-status.enum";

@Injectable()
export class CredentialsRepository{
    private readonly crdFilePath = path.join(__dirname, "../../../..", 'data/credential.data.json');

    loadAll(){
        if(!fs.existsSync(this.crdFilePath)) return []
        const crds = fs.readFileSync(this.crdFilePath, 'utf8');
        return crds? JSON.parse(crds) : [];
    }
    private saveNewCrd(crds: ICrdRecordSchema[]){
        fs.writeFileSync(this.crdFilePath, JSON.stringify(crds, null, 2));
        return;
    }
    private getById(id:string){
        const crds: ICrdRecordSchema[] = this.loadAll()
        const _existCrd = crds.find((crd:ICrdRecordSchema)=>(String(crd.id).trim() === String(id).trim()));
        if(!_existCrd) throw new NotFoundException('this crd not found');
        else return _existCrd;
    }
    public create(createdCrdDto: CreateCredentialsDto){
        const crds: ICrdRecordSchema[] = this.loadAll();
        const creationDate = new Date();
        const expiryDate = new Date(creationDate.getTime() + 15 * 60000); //after 15 min expired
        const newCrd: ICrdRecordSchema = { ...createdCrdDto,status:InvitationStatus.Pending, id: idGenerator(),creationDate, expiryDate};
        crds.push(newCrd);
        this.saveNewCrd(crds);
        return newCrd;

    }
    getBySubject(subject: string){
        const crds: ICrdRecordSchema[] = this.loadAll();
        const _existCrds = crds.find((crd:ICrdRecordSchema)=>(String(crd.subject).trim() === String(subject).trim()));
        return _existCrds;
    }
    changeCrdStatus(crdId:string, status){
        const crds = this.loadAll()
        const _existCrd = crds.find((crd:ICrdRecordSchema)=>(String(crd.id).trim() === String(crdId).trim()));
        if(!_existCrd) throw new NotFoundException('this crd not found');
        _existCrd.status = status
        this.saveNewCrd(crds);
        return true

    }
}