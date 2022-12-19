import React from 'react';
import { DependencyInjectionClient } from './dependency-injection-client';

const dependencyInjectionClient = new DependencyInjectionClient();

type TokenMapping<P, I extends keyof P> = {
    [K in I]: string;
};

type ResolvedTokenMapping<I> = {
    [K in keyof I]: I[K];
};

type ReactProps<P> = P & {};

export function inject<P, I extends keyof P>(
    tokensMapping: TokenMapping<P, I>,
    Component: React.ComponentType<P>
) {
    return (propsWithoutInjectedProps: Omit<P, I>) => {
        const keys = Object.keys(tokensMapping);
        const resolvedTokensMapping: ResolvedTokenMapping<I> = resolveTokens<P, I>(
            keys,
            tokensMapping
        );
        const props = Object.assign(
            {},
            propsWithoutInjectedProps,
            resolvedTokensMapping
        ) as ReactProps<P>;
        return <Component {...props} />;
    };
}

function resolveTokens<P, I extends keyof P>(
    keys: string[],
    tokensMapping: TokenMapping<P, I>
): ResolvedTokenMapping<I> {
    return keys.reduce<I>((currentResolvedTokenMapping, key) => {
        const token = Object.getOwnPropertyDescriptor(tokensMapping, key)?.value;
        setResolvedToken<P, I>(currentResolvedTokenMapping, key, token);
        return currentResolvedTokenMapping;
    }, {} as ResolvedTokenMapping<I>);
}

function setResolvedToken<P, I extends keyof P>(
    currentResolvedTokenMapping: I,
    key: string,
    token: any
) {
    Object.defineProperty(currentResolvedTokenMapping, key, {
        value: dependencyInjectionClient.resolve<any>(token),
        enumerable: true,
        writable: true,
        configurable: true,
    });
}
