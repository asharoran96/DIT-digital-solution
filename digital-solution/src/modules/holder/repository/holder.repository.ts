import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as fs from 'fs'
import * as path from "path";
import { idGenerator, walletKeyGenerator } from "../../../utils/id-generator.util";
import { ICreateHolder } from "../interface/create-holder.interface";
@Injectable()
export class HolderRepository{
    private readonly holderFilePath = path.join(__dirname, '../../../../..', 'data/holder.data.json');

    private getAll() {
        if (!fs.existsSync(this.holderFilePath)) return [];
        const holdersData = fs.readFileSync(this.holderFilePath, 'utf8');
        return holdersData? JSON.parse(holdersData): [];
    }
    private saveHolder(holders: ICreateHolder[]) {
        fs.writeFileSync(this.holderFilePath, JSON.stringify(holders, null, 2));
        return;
    }
    create(holderName: string) {
        const holders: ICreateHolder[] = this.getAll();
        console.log(holders)
        const existHolder = this.existHolderByName(holderName);
        if (existHolder) throw new ConflictException(`Holder already exist with this ${holderName} name`);
        const newHolder: ICreateHolder = { name: holderName, id: idGenerator(), credentials: [], walletKey: walletKeyGenerator(holderName) }; // for the wallet key generate anything
        holders.push(newHolder);
        this.saveHolder(holders);
        return newHolder;
    }
    existHolderByName(name: string) {
        const holders: [] = this.getAll()
        const targetHolder = holders.find((holder: ICreateHolder ) => (String(holder.name) === String(name)));
        if (!targetHolder) return false;
        // throw new NotFoundException(`Holder not found with this name ${name}`);
        else return targetHolder;
    }

    getHolderById(id: string) {
        const holders: [] = this.getAll()
        const targetHolder = holders.find((holder: ICreateHolder) => (String(holder.id) === String(id)));
        if (!targetHolder) throw new NotFoundException(`Holder not found with this id ${id}`);
        else return targetHolder;
    }
    addCrdToHolder(holderId: string , crdId: string){
        const holders = this.getAll()
        const _existHolder: ICreateHolder = holders.find((holder) => String(holder.id).trim() === holderId.trim());
        if(_existHolder) {
            _existHolder.credentials.push(crdId)
            this.saveHolder(holders)
            return true
        }
        else throw new NotFoundException('Issuer with this Id not exist')
    }
    //change the crd status
    //get crd by id from the holder's crd list
}

