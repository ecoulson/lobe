import { MoneyComponent } from '../money/money-component';
import { ExpenseCategoryComponentProps } from './expense-category-component-props';

export function ExpenseCategoryComponent({ expenseCategory }: ExpenseCategoryComponentProps) {
    return (
        <div>
            <MoneyComponent money={expenseCategory.totalSpent} />
        </div>
    );
}
