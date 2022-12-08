import { Expenses } from '../../models/expenses/expenses';
import { Money } from '../../models/funds/money';
import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { MoneyComponent } from '../funds/money-component';
import { MoneyInputComponent } from '../funds/money-input-component';
import { ExpensesRowComponentProps } from './expenses-row-component-props';

type ExpenseCategoryKeys =
    | 'debtPayments'
    | 'entertainment'
    | 'food'
    | 'healthcare'
    | 'housing'
    | 'insurance'
    | 'miscellaneous'
    | 'personal'
    | 'transportation'
    | 'utilities';

export function ExpensesRowComponent({ expensesList, updateExpenses }: ExpensesRowComponentProps) {
    function updateExpenseCategoryTotalSpent<
        K extends Extract<keyof Expenses, ExpenseCategoryKeys>
    >(expenses: Expenses, key: K) {
        return (totalSpent: Money) => {
            expenses[key].totalSpent = totalSpent;
            updateExpenses(expenses);
        };
    }

    return (
        <BudgetSectionComponent heading="Expenses">
            <BudgetRowComponent
                field="Debt Payments"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.debtPayments.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'debtPayments')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Entertainment"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.entertainment.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'entertainment')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Food"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.food.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'food')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Healthcare"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.healthcare.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'healthcare')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Housing"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.housing.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'housing')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Insurance"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.insurance.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'insurance')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Miscellaneous"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.miscellaneous.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'miscellaneous')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Personal"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.personal.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'personal')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Transportation"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.transportation.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'transportation')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Utilities"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.utilities.totalSpent}
                        onChange={updateExpenseCategoryTotalSpent(expenses, 'utilities')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Total Expenses"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.totalExpenses} />
                ))}
            />
        </BudgetSectionComponent>
    );
}
