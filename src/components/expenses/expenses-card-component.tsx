import { CardComponent } from '../card/card-component';
import { CardComponentHeaderType } from '../card/card-component-header-type';
import { ExpensesCardComponentProps } from './expenses-card-component-props';
import { ReactComponent as ExpensesIcon } from '../../assets/expenses.svg';
import { DataComponent } from '../data/data-component';
import { DataComponentSize } from '../data/data-component-size';
import { MoneyComponent } from '../funds/money-component';
import { inject } from '../../clients/dependency-injection/inject';
import { useEffect, useState } from 'react';
import { MoneyInputComponent } from '../funds/money-input-component';
import { Expenses } from '../../models/expenses/expenses';

export const ExpensesCardComponent = inject<ExpensesCardComponentProps, 'expensesController'>(
    {
        expensesController: 'ExpensesController',
    },
    ({ role, expensesController, updateRole }: ExpensesCardComponentProps) => {
        const [expenses, setExpenses] = useState(expensesController.getExpensesByRole(role));

        function updateExpenses(expenses: Expenses) {
            setExpenses(expensesController.updateExpenses(expenses));
            updateRole(role);
        }

        useEffect(() => {
            setExpenses(expensesController.getExpensesByRole(role));
        }, [role, setExpenses, expensesController]);

        return (
            <CardComponent
                headerType={CardComponentHeaderType.Expenses}
                title="Expenses"
                icon={<ExpensesIcon width={32} height={32} fill="white" />}
            >
                <div className="flex gap-x-4 justify-between">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {expenses.categories.map((category) => (
                            <DataComponent
                                key={category.name}
                                label={category.name}
                                data={
                                    <MoneyInputComponent
                                        money={category.totalSpent}
                                        onChange={(totalSpent) => {
                                            category.totalSpent = totalSpent;
                                            updateExpenses(expenses);
                                        }}
                                    />
                                }
                            />
                        ))}
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
