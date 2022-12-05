import { DependencyInjectionBroker } from '../../brokers/dependency-injection/dependency-injection-broker';
import { DependencyInjectionService } from '../../services/foundations/dependency-injection/dependency-injection-service';

export class DependencyInjectionClient {
    private static readonly dependencyInjectionService: DependencyInjectionService =
        new DependencyInjectionService(new DependencyInjectionBroker());

    register<T>(token: string, value: T) {
        DependencyInjectionClient.dependencyInjectionService.register(token, value);
    }

    resolve<T>(token: string): T {
        return DependencyInjectionClient.dependencyInjectionService.resolve<T>(token);
    }
}
