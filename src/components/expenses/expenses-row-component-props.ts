import { Expenses } from '../../models/expenses/expenses';

export interface ExpensesRowComponentProps {
    expensesList: Expenses[];
    updateExpenses: (expenses: Expenses) => void;
}
