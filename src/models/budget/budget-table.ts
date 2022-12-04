import { Expenses } from '../expenses/expenses';
import { Income } from '../incomes/income';
import { Role } from '../roles/role';
import { SavingStatistics } from '../savings/saving-statistics';
import { Savings } from '../savings/savings';
import { WealthProjection } from '../wealth-projections/wealth-projection';

export class BudgetTable {
    public roleList: Role[];
    public incomeList: Income[];
    public expensesList: Expenses[];
    public savingsList: Savings[];
    public savingsStatisticsList: SavingStatistics[];
    public wealthProjectionList: WealthProjection[];

    constructor() {
        this.roleList = [];
        this.incomeList = [];
        this.expensesList = [];
        this.savingsList = [];
        this.savingsStatisticsList = [];
        this.wealthProjectionList = [];
    }
}
