import { BalanceComponentProps } from './balance-component-props';

export function BalanceComponent({ balance }: BalanceComponentProps) {
    return (
        <div>
            {balance.sign}
            {balance.currency}
            {balance.value}
        </div>
    );
}
