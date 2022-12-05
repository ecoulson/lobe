import { Money } from '../money/money';
import { ExpenseCategory } from './expense-category';

export interface ExpensesProps {
    housing: ExpenseCategory;
    transportation: ExpenseCategory;
    food: ExpenseCategory;
    utilities: ExpenseCategory;
    insurance: ExpenseCategory;
    healthcare: ExpenseCategory;
    debtPayments: ExpenseCategory;
    personal: ExpenseCategory;
    entertainment: ExpenseCategory;
    miscellaneous: ExpenseCategory;
    totalExpenses: Money;
}
