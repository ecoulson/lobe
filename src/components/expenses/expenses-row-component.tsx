import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { MoneyComponent } from '../funds/money-component';
import { MoneyInputComponent } from '../funds/money-input-component';
import { ExpensesRowComponentProps } from './expenses-row-component-props';

export function ExpensesRowComponent({ expensesList }: ExpensesRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Expenses">
            <BudgetRowComponent
                field="Debt Payments"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.debtPayments.totalSpent}
                        onChange={() => {}}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Entertainment"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.entertainment.totalSpent}
                        onChange={() => {}}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Food"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent money={expenses.food.totalSpent} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="Healthcare"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.healthcare.totalSpent}
                        onChange={() => {}}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Housing"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent money={expenses.housing.totalSpent} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="Insurance"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.insurance.totalSpent}
                        onChange={() => {}}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Miscellaneous"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.miscellaneous.totalSpent}
                        onChange={() => {}}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Personal"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent money={expenses.personal.totalSpent} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="Transportation"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.transportation.totalSpent}
                        onChange={() => {}}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Utilities"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.utilities.totalSpent}
                        onChange={() => {}}
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
