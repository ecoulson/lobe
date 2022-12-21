import { LocalStorageBrokerConfiguration } from './local-storage-broker-configuration';
import { StorageBroker } from './storage-broker';

export class LocalStorageBroker<T extends { id: string }> implements StorageBroker<T> {
    private readonly configuration: LocalStorageBrokerConfiguration;

    constructor(configuration: LocalStorageBrokerConfiguration) {
        this.configuration = configuration;
        this.ensureCollectionExists();
    }

    private ensureCollectionExists() {
        if (!window.localStorage.getItem(this.getCollectionKey())) {
            window.localStorage.setItem(this.getCollectionKey(), '{}');
        }
    }

    private getCollectionKey() {
        return `${this.configuration.applicationId}://${this.configuration.collectionId}`;
    }

    private getCollection() {
        return JSON.parse(window.localStorage.getItem(this.getCollectionKey()) as string) as Record<
            string,
            T
        >;
    }

    private setCollection(collection: Record<string, T>) {
        window.localStorage.setItem(this.getCollectionKey(), JSON.stringify(collection));
    }

    selectAll(): T[] {
        const collection = this.getCollection();
        return Object.values(collection);
    }

    selectById(id: string): T {
        const collection = this.getCollection();
        return collection[id];
    }

    save(entity: T): T {
        const collection = this.getCollection();
        collection[entity.id] = entity;
        this.setCollection(collection);
        return entity;
    }

    delete(entity: T): T {
        const collection = this.getCollection();
        delete collection[entity.id];
        this.setCollection(collection);
        return entity;
    }
}
