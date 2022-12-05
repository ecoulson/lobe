import { DependencyInjectionBroker } from '../../../brokers/dependency-injection/dependency-injection-broker';

export class DependencyInjectionService {
    private readonly dependencyInjectionBroker: DependencyInjectionBroker;

    constructor(dependencyInjectionBroker: DependencyInjectionBroker) {
        this.dependencyInjectionBroker = dependencyInjectionBroker;
    }

    resolve<T>(token: string): T {
        return this.dependencyInjectionBroker.resolve(token);
    }

    register<T>(token: string, value: T) {
        this.dependencyInjectionBroker.register(token, value);
    }
}
