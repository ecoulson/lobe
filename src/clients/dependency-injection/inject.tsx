import React from 'react';
import { DependencyInjectionClient } from './dependency-injection-client';

const dependencyInjectionClient = new DependencyInjectionClient();

type TokenMapping<P, I extends keyof P> = {
    [K in I]: string;
};
type ResolvedTokenMapping<I> = {
    [K in keyof I]: I[K];
};

export function inject<P, I extends keyof P>(
    tokensMapping: TokenMapping<P, I>,
    component: React.ComponentType<P>
) {
    return (propsWithoutInjectedProps: Omit<P, I>) => {
        const keys = Object.keys(tokensMapping);
        const resolvedTokensMapping: ResolvedTokenMapping<I> = keys.reduce<I>(
            (currentResolvedTokenMapping, key) => {
                const token = Object.getOwnPropertyDescriptor(tokensMapping, key)?.value;
                Object.defineProperty(currentResolvedTokenMapping, key, {
                    value: dependencyInjectionClient.resolve<any>(token),
                    enumerable: true,
                    writable: true,
                    configurable: true,
                });
                return currentResolvedTokenMapping;
            },
            {} as ResolvedTokenMapping<I>
        );
        const props: P & {} = Object.assign(
            {},
            propsWithoutInjectedProps,
            resolvedTokensMapping
        ) as P & {};
        const Component = component;
        return <Component {...props} />;
    };
}
