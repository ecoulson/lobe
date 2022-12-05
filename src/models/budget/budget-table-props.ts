import { Expenses } from '../expenses/expenses';
import { Income } from '../incomes/income';
import { Role } from '../roles/role';
import { SavingStatistics } from '../savings/saving-statistics';
import { Savings } from '../savings/savings';
import { WealthProjection } from '../wealth-projections/wealth-projection';

export interface BudgetTableProps {
    id: string;
    roleList: Role[];
    incomeList: Income[];
    expensesList: Expenses[];
    savingsList: Savings[];
    savingsStatisticsList: SavingStatistics[];
    wealthProjectionList: WealthProjection[];
}
