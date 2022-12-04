import { MoneyComponent } from '../money/money-component';
import { SavingsComponentProps } from './savings-component-props';

export function SavingsComponent({ savings }: SavingsComponentProps) {
    return (
        <div>
            <MoneyComponent money={savings.cashOnHand} />
            <MoneyComponent money={savings.equity} />
            <MoneyComponent money={savings.total401k} />
            <MoneyComponent money={savings.totalSaved} />
        </div>
    );
}
