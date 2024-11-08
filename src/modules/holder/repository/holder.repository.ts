import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as fs from 'fs'
import path from "path";
import { idGenerator } from "src/utils/id-generator.util";
import { CreateHolderReqDto } from "../dto/create-request.dto";
@Injectable()
export class HolderRepository{
    private readonly holderFilePath = path.join(__dirname, '../../..', 'data/holder.data.json');
    private getAll() {
        if (!fs.existsSync(this.holderFilePath)) return [];
        const holdersData = fs.readFileSync(this.holderFilePath, 'utf8');
        return JSON.parse(holdersData);
    }
    private saveHolder(holders: CreateHolderReqDto[]) {
        fs.writeFileSync(this.holderFilePath, JSON.stringify(holders, null, 2));
        return;
    }
    create(holderDat: CreateHolderReqDto) {
        const Holders: CreateHolderReqDto[] = this.getAll();
        const existHolder = this.existVerifierById(holderDat.id);
        if (existHolder) throw new ConflictException(`Holder already exist with this ${holderDat.id} id`);
        const newHolder: CreateHolderReqDto = { ...holderDat, id: idGenerator(), credentials: [] }; // for the wallet key generate anything
        Holders.push(newHolder);
        this.saveHolder(Holders);
        return newHolder;
    }
    existVerifierById(id: string) {
        const holders: [] = this.getAll()
        const targetHolder = holders.find((holder: CreateHolderReqDto ) => (String(holder.id) === String(id)));
        if (!targetHolder) throw new NotFoundException(`Holder not found with this id ${id}`);
        return targetHolder;
    }


    // push crd on his crd 
    //change the crd status
    //get crd by id from the holder's crd list
}