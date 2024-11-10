import { v4 as uuid } from 'uuid';

export const idGenerator = () => {
    const id = uuid();
    return String(id);
}

export const walletKeyGenerator = (name:String)=>{
    const id = idGenerator();
    const encryptedName = Buffer.from(name).toString('base64')
    return `${id.slice(1,8)}${encryptedName.slice(1,8)}`

}