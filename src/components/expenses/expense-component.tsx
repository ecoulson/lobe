import { ExpenseCategoryComponent } from './expense-category-component';
import { ExpensesComponentProps } from './expense-component-props';

export function ExpensesComponent({ expenses: expense }: ExpensesComponentProps) {
    return (
        <div>
            <ExpenseCategoryComponent expenseCategory={expense.debtPayments} />
            <ExpenseCategoryComponent expenseCategory={expense.entertainment} />
            <ExpenseCategoryComponent expenseCategory={expense.food} />
            <ExpenseCategoryComponent expenseCategory={expense.healthcare} />
            <ExpenseCategoryComponent expenseCategory={expense.housing} />
            <ExpenseCategoryComponent expenseCategory={expense.insurance} />
            <ExpenseCategoryComponent expenseCategory={expense.miscellaneous} />
            <ExpenseCategoryComponent expenseCategory={expense.personal} />
            <ExpenseCategoryComponent expenseCategory={expense.transportation} />
            <ExpenseCategoryComponent expenseCategory={expense.utilities} />
        </div>
    );
}
