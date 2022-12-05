import { Income } from '../../models/incomes/income';

export interface IncomeRowComponentProps {
    incomeList: Income[];
    updateIncome: (income: Income) => void;
}
