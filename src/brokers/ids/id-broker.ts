import { v4 as uuid } from 'uuid';

export class IdBroker {
    generateId(): string {
        return uuid();
    }
}
