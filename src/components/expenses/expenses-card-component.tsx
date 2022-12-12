import { CardComponent } from '../card/card-component';
import { CardComponentHeaderType } from '../card/card-component-header-type';
import { ExpensesCardComponentProps } from './expenses-card-component-props';
import { ReactComponent as ExpensesIcon } from '../../assets/expenses.svg';
import { DataComponent } from '../data/data-component';
import { DataComponentSize } from '../data/data-component-size';
import { MoneyComponent } from '../funds/money-component';
import { inject } from '../../clients/dependency-injection/inject';
import { useEffect, useState } from 'react';

export const ExpensesCardComponent = inject<ExpensesCardComponentProps, 'expensesController'>(
    {
        expensesController: 'ExpensesController',
    },
    ({ role, expensesController }: ExpensesCardComponentProps) => {
        const [expenses, setExpenses] = useState(expensesController.getExpensesByRole(role));

        useEffect(() => {
            setExpenses(expensesController.getExpensesByRole(role));
        }, [role, setExpenses, expensesController]);
        return (
            <CardComponent
                headerType={CardComponentHeaderType.Expenses}
                title="Expenses"
                icon={<ExpensesIcon width={32} height={32} fill="white" />}
            >
                <div className="flex items-center justify-between">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-between">
                        <DataComponent
                            label="Debt Payments"
                            data={<MoneyComponent money={expenses.debtPayments.totalSpent} />}
                        />
                        <DataComponent
                            label="Entertainment"
                            data={<MoneyComponent money={expenses.entertainment.totalSpent} />}
                        />
                        <DataComponent
                            label="Food"
                            data={<MoneyComponent money={expenses.food.totalSpent} />}
                        />
                        <DataComponent
                            label="Healthcare"
                            data={<MoneyComponent money={expenses.healthcare.totalSpent} />}
                        />
                        <DataComponent
                            label="Housing"
                            data={<MoneyComponent money={expenses.housing.totalSpent} />}
                        />
                        <DataComponent
                            label="Insurance"
                            data={<MoneyComponent money={expenses.insurance.totalSpent} />}
                        />
                        <DataComponent
                            label="Miscellaneous"
                            data={<MoneyComponent money={expenses.miscellaneous.totalSpent} />}
                        />
                        <DataComponent
                            label="Personal"
                            data={<MoneyComponent money={expenses.personal.totalSpent} />}
                        />
                        <DataComponent
                            label="Transportation"
                            data={<MoneyComponent money={expenses.transportation.totalSpent} />}
                        />
                        <DataComponent
                            label="Utilities"
                            data={<MoneyComponent money={expenses.utilities.totalSpent} />}
                        />
                    </div>
                    <div className="flex flex-col gap-y-8">
                        <DataComponent
                            label="Total Expenses"
                            size={DataComponentSize.LARGE}
                            data={
                                <div className="text-card-expenses">
                                    <MoneyComponent money={expenses.totalExpenses} />
                                </div>
                            }
                        />
                        <DataComponent
                            label="Top Category"
                            size={DataComponentSize.LARGE}
                            data={<div className="text-card-expenses">{expenses.topCategory}</div>}
                        />
                        <DataComponent
                            label="Lowest Category"
                            size={DataComponentSize.LARGE}
                            data={<div className="text-card-income">{expenses.bottomCategory}</div>}
                        />
                    </div>
                </div>
            </CardComponent>
        );
    }
);
