import { CardComponent } from '../card/card-component';
import { ReactComponent as SavingsIcon } from '../../assets/savings.svg';
import { DataComponent } from '../data/data-component';
import { DataComponentSize } from '../data/data-component-size';
import { MoneyComponent } from '../funds/money-component';
import { SavingsCardComponentProps } from './savings-card-component-props';
import { BalanceComponent } from '../funds/balance-component';

export function SavingsCardComponent({ savings }: SavingsCardComponentProps) {
    function getBalanceTextColor() {
        if (savings.totalSaved.sign === '-') {
            return 'text-card-expenses';
        }
        return 'text-card-income';
    }

    return (
        <CardComponent title="Savings" icon={<SavingsIcon width={32} height={32} />}>
            <div className="flex gap-16 items-center">
                <div className="flex flex-col gap-y-4">
                    <DataComponent label="Stock" data={<MoneyComponent money={savings.equity} />} />
                    <DataComponent
                        label="Contributions To 401k"
                        data={<MoneyComponent money={savings.contributionsTo401k} />}
                    />
                    <DataComponent
                        label="Cash On Hand"
                        data={<MoneyComponent money={savings.cashOnHand} />}
                    />
                </div>
                <div className="flex flex-col gap-y-4">
                    <DataComponent
                        label="Total Saved"
                        size={DataComponentSize.LARGE}
                        data={
                            <p className={getBalanceTextColor()}>
                                <BalanceComponent balance={savings.totalSaved} />
                            </p>
                        }
                    />
                </div>
            </div>
        </CardComponent>
    );
}
