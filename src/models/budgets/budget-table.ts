import { Expenses } from '../expenses/expenses';
import { Income } from '../incomes/income';
import { Role } from '../roles/role';
import { SavingStatistics } from '../savings/saving-statistics';
import { Savings } from '../savings/savings';
import { WealthProjection } from '../wealth-projections/wealth-projection';

export class BudgetTable {
    public id: string;
    public numberOfColumns: number;
    public roleList: Role[];
    public incomeList: Income[];
    public expensesList: Expenses[];
    public savingsList: Savings[];
    public savingsStatisticsList: SavingStatistics[];
    public wealthProjectionList: WealthProjection[];

    constructor(props?: Partial<BudgetTable>) {
        const {
            id,
            numberOfColumns,
            roleList,
            incomeList,
            expensesList,
            savingsList,
            savingsStatisticsList,
            wealthProjectionList,
        } = {
            id: '',
            numberOfColumns: 0,
            roleList: [],
            incomeList: [],
            expensesList: [],
            savingsList: [],
            savingsStatisticsList: [],
            wealthProjectionList: [],
            ...props,
        };
        this.id = id;
        this.numberOfColumns = numberOfColumns;
        this.roleList = roleList;
        this.incomeList = incomeList;
        this.expensesList = expensesList;
        this.savingsList = savingsList;
        this.savingsStatisticsList = savingsStatisticsList;
        this.wealthProjectionList = wealthProjectionList;
    }
}
