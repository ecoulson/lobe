import { Expenses } from '../expenses/expenses';
import { Income } from '../incomes/income';
import { Role } from '../roles/role';
import { SavingStatistics } from '../savings/saving-statistics';
import { Savings } from '../savings/savings';
import { WealthProjection } from '../wealth-projections/wealth-projection';

export class BudgetTable {
    public id: string;
    public roleList: Role[];
    public incomeList: Income[];
    public expensesList: Expenses[];
    public savingsList: Savings[];
    public savingsStatisticsList: SavingStatistics[];
    public wealthProjectionList: WealthProjection[];

    constructor(props?: Partial<BudgetTable>) {
        const {
            id,
            roleList,
            incomeList,
            expensesList,
            savingsList,
            savingsStatisticsList,
            wealthProjectionList,
        } = {
            id: '',
            roleList: [],
            incomeList: [],
            expensesList: [],
            savingsList: [],
            savingsStatisticsList: [],
            wealthProjectionList: [],
            ...props,
        };
        this.id = id;
        this.roleList = roleList;
        this.incomeList = incomeList;
        this.expensesList = expensesList;
        this.savingsList = savingsList;
        this.savingsStatisticsList = savingsStatisticsList;
        this.wealthProjectionList = wealthProjectionList;
    }
}
