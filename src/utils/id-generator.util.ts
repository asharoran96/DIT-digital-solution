import { v4 as uuid } from 'uuid';

export const idGenerator = () => {
    const id = uuid();
    return String(id);
}