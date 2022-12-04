import { MoneyComponentProps } from './money-component-props';

export function MoneyComponent({ money }: MoneyComponentProps) {
    return (
        <div>
            <p>
                {money.currency}
                {money.value}
            </p>
        </div>
    );
}
