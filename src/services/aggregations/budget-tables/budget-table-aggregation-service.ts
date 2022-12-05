import { BudgetTable } from '../../../models/budget/budget-table';
import { Expenses } from '../../../models/expenses/expenses';
import { Income } from '../../../models/incomes/income';
import { Role } from '../../../models/roles/role';
import { SavingStatistics } from '../../../models/savings/saving-statistics';
import { Savings } from '../../../models/savings/savings';
import { Percentage } from '../../../models/statistics/percentage';
import { Tax } from '../../../models/taxes/tax';
import { WealthProjection } from '../../../models/wealth-projections/wealth-projection';
import { BudgetTableService } from '../../foundations/budget-tables/budget-table-service';
import { ExpenseOrchestrationService } from '../../orchestrations/expenses/expense-orchestration-service';
import { IncomeOrchestrationService } from '../../orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from '../../orchestrations/roles/role-orchestration-service';

export class BudgetTableAggregationService {
    private readonly budgetTableService: BudgetTableService;
    private readonly roleOrchestrationService: RoleOrchestrationService;
    private readonly incomeOrchestrationService: IncomeOrchestrationService;
    private readonly expensesOrchestrationService: ExpenseOrchestrationService;

    constructor(
        budgetTableService: BudgetTableService,
        roleOrchestrationService: RoleOrchestrationService,
        incomeOrchestrationService: IncomeOrchestrationService,
        expensesOrchestrationService: ExpenseOrchestrationService
    ) {
        this.budgetTableService = budgetTableService;
        this.roleOrchestrationService = roleOrchestrationService;
        this.incomeOrchestrationService = incomeOrchestrationService;
        this.expensesOrchestrationService = expensesOrchestrationService;
    }

    upsertBudgetTable(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    getBudgetTable(id: string) {
        return this.budgetTableService.getBudgetTable(id);
    }

    addColumn(budgetTable: BudgetTable): BudgetTable {
        budgetTable.savingsList.push(new Savings());
        budgetTable.savingsStatisticsList.push(new SavingStatistics());
        budgetTable.wealthProjectionList.push(new WealthProjection());
        this.incomeOrchestrationService.addIncomeToBudgetTable(budgetTable);
        this.expensesOrchestrationService.addExpensesToBudgetTable(budgetTable);
        this.roleOrchestrationService.addRoleToBudgetTable(budgetTable);
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    updateRole(budgetTable: BudgetTable, newRole: Role): BudgetTable {
        this.roleOrchestrationService.updateRoleInBudgetTable(budgetTable, newRole);
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    updateIncome(budgetTable: BudgetTable, newIncome: Income): BudgetTable {
        const tax = new Tax({
            rate: new Percentage({
                value: 30,
            }),
        });
        this.incomeOrchestrationService.updateIncomeInBudgetTable(budgetTable, newIncome, tax);
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    updateExpenses(budgetTable: BudgetTable, newExpenses: Expenses): BudgetTable {
        this.expensesOrchestrationService.updateExpensesInBudgetTable(budgetTable, newExpenses);
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }
}
