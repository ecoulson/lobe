export class DependencyInjectionBroker {
    private tokenLookup: Map<string, any>;

    constructor() {
        this.tokenLookup = new Map();
    }

    resolve<T>(token: string) {
        return this.tokenLookup.get(token) as T;
    }

    register<T>(token: string, value: T) {
        this.tokenLookup.set(token, value);
    }
}
