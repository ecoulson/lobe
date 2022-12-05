import { BudgetTable } from '../../../models/budget/budget-table';
import { Expenses } from '../../../models/expenses/expenses';
import { Income } from '../../../models/incomes/income';
import { Role } from '../../../models/roles/role';
import { SavingStatistics } from '../../../models/savings/saving-statistics';
import { Savings } from '../../../models/savings/savings';
import { WealthProjection } from '../../../models/wealth-projections/wealth-projection';
import { BudgetTableService } from '../../foundations/budget-tables/budget-table-service';

export class BudgetTableAggregationService {
    private readonly budgetTableService: BudgetTableService;

    constructor(budgetTableService: BudgetTableService) {
        this.budgetTableService = budgetTableService;
    }

    upsertBudgetTable(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    getBudgetTable(id: string) {
        return this.budgetTableService.getBudgetTable(id);
    }

    addColumn(budgetTable: BudgetTable) {
        budgetTable.expensesList.push(new Expenses());
        budgetTable.incomeList.push(new Income());
        budgetTable.roleList.push(new Role());
        budgetTable.savingsList.push(new Savings());
        budgetTable.savingsStatisticsList.push(new SavingStatistics());
        budgetTable.wealthProjectionList.push(new WealthProjection());
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    updateRole(role: Role) {
        
    }
}
