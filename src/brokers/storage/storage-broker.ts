export interface StorageBroker<T> {
    selectAll(): T[];
    selectById(id: string): T;
    save(entity: T): T;
    delete(entity: T): T;
}
