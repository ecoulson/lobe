import { Expenses } from '../expenses/expenses';
import { Income } from '../incomes/income';
import { Role } from '../roles/role';
import { SavingStatistics } from '../savings/saving-statistics';
import { Savings } from '../savings/savings';
import { WealthProjection } from '../wealth-projections/wealth-projection';

export class BudgetColumn {
    public role: Role;
    public income: Income;
    public expenses: Expenses;
    public savings: Savings;
    public savingsStatistics: SavingStatistics;
    public wealthProjection: WealthProjection;

    constructor() {
        this.role = new Role();
        this.income = new Income();
        this.expenses = new Expenses();
        this.savings = new Savings();
        this.savingsStatistics = new SavingStatistics();
        this.wealthProjection = new WealthProjection();
    }
}
