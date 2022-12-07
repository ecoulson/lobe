import { Expenses } from '../expenses/expenses';
import { Income } from '../incomes/income';
import { Role } from '../roles/role';
import { SavingStatistics } from '../savings/saving-statistics';
import { Savings } from '../savings/savings';
import { WealthProjection } from '../wealth-projections/wealth-projection';

export class BudgetColumn {
    public index: number;
    public role: Role;
    public income: Income;
    public expenses: Expenses;
    public savings: Savings;
    public savingsStatistics: SavingStatistics;
    public wealthProjection: WealthProjection;

    constructor(props?: Partial<BudgetColumn>) {
        const { index, role, income, expenses, savings, savingsStatistics, wealthProjection } = {
            index: -1,
            role: new Role(),
            income: new Income(),
            expenses: new Expenses(),
            savings: new Savings(),
            savingsStatistics: new SavingStatistics(),
            wealthProjection: new WealthProjection(),
            ...props,
        };
        this.index = index;
        this.role = role;
        this.income = income;
        this.expenses = expenses;
        this.savings = savings;
        this.savingsStatistics = savingsStatistics;
        this.wealthProjection = wealthProjection;
    }
}
