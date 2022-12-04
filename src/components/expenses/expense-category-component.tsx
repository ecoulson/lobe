import { MoneyComponent } from '../money/money-component';
import { ExpenseCategoryComponentProps } from './expense-category-component-props';

export function ExpenseCategoryComponent({ expenseCategory }: ExpenseCategoryComponentProps) {
    return (
        <div>
            <h3>{expenseCategory.category}</h3>
            <MoneyComponent money={expenseCategory.totalSpent} />
        </div>
    );
}
