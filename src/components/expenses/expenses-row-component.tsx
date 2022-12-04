import { BudgetRowComponent } from '../budget/budget-row-component';
import { MoneyComponent } from '../money/money-component';
import { ExpensesRowComponentProps } from './expenses-row-component-props';

export function ExpensesRowComponent({ expensesList }: ExpensesRowComponentProps) {
    return (
        <div>
            <h2>Expenses</h2>
            <BudgetRowComponent
                field="Debt Payments"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.debtPayments.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Entertainment"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.entertainment.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Food"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.food.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Healthcare"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.healthcare.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Housing"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.housing.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Insurance"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.insurance.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Miscellaneous"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.miscellaneous.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Personal"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.personal.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Transportation"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.transportation.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Utilities"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.utilities.totalSpent} />
                ))}
            />
            <BudgetRowComponent
                field="Total Expenses"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.totalExpenses} />
                ))}
            />
        </div>
    );
}
