import { BudgetTable } from '../../../models/budget/budget-table';
import { Expenses } from '../../../models/expenses/expenses';
import { Income } from '../../../models/incomes/income';
import { Role } from '../../../models/roles/role';
import { SavingStatistics } from '../../../models/savings/saving-statistics';
import { Savings } from '../../../models/savings/savings';
import { WealthProjection } from '../../../models/wealth-projections/wealth-projection';
import { BudgetTableService } from '../../foundations/budget-tables/budget-table-service';
import { RoleOrchestrationService } from '../../orchestrations/roles/role-orchestration-service';

export class BudgetTableAggregationService {
    private readonly budgetTableService: BudgetTableService;
    private readonly roleOrchestrationService: RoleOrchestrationService;

    constructor(budgetTableService: BudgetTableService, roleService: RoleOrchestrationService) {
        this.budgetTableService = budgetTableService;
        this.roleOrchestrationService = roleService;
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
        budgetTable.savingsList.push(new Savings());
        budgetTable.savingsStatisticsList.push(new SavingStatistics());
        budgetTable.wealthProjectionList.push(new WealthProjection());
        return this.roleOrchestrationService.addRoleToBudgetTable(budgetTable);
    }

    updateRole(budgetTable: BudgetTable, newRole: Role): BudgetTable {
        return this.roleOrchestrationService.updateRoleInBudgetTable(budgetTable, newRole);
    }
}
