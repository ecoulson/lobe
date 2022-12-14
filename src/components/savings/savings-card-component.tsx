import { CardComponent } from '../card/card-component';
import { ReactComponent as SavingsIcon } from '../../assets/savings.svg';
import { DataComponent } from '../data/data-component';
import { DataComponentSize } from '../data/data-component-size';
import { MoneyComponent } from '../funds/money-component';
import { SavingsCardComponentProps } from './savings-card-component-props';
import { BalanceComponent } from '../funds/balance-component';
import { inject } from '../../clients/dependency-injection/inject';
import { useEffect, useState } from 'react';

export const SavingsCardComponent = inject<SavingsCardComponentProps, 'savingsController'>(
    {
        savingsController: 'SavingsController',
    },
    ({ role, savingsController }: SavingsCardComponentProps) => {
        const [savings, setSavings] = useState(savingsController.getSavingsByRole(role));

        useEffect(() => {
            setSavings(savingsController.getSavingsByRole(role));
        }, [role, setSavings, savingsController]);

        function getBalanceTextColor() {
            if (savings.totalSaved.sign === '-') {
                return 'text-card-expenses';
            }
            return 'text-card-income';
        }

        return (
            <CardComponent title="Savings" icon={<SavingsIcon width={32} height={32} />}>
                <div className="flex gap-8 items-center justify-between flex-wrap sm:flex-nowrap">
                    <div className="flex flex-col gap-y-4">
                        <DataComponent
                            label="Stock"
                            data={<MoneyComponent money={savings.equity} />}
                        />
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
                                <div className={getBalanceTextColor()}>
                                    <BalanceComponent balance={savings.totalSaved} />
                                </div>
                            }
                        />
                    </div>
                </div>
            </CardComponent>
        );
    }
);
