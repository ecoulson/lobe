import { BudgetTable } from '../../../models/budget/budget-table';
import { Expenses } from '../../../models/expenses/expenses';
import { Income } from '../../../models/incomes/income';
import { Role } from '../../../models/roles/role';
import { SavingStatistics } from '../../../models/savings/saving-statistics';
import { Savings } from '../../../models/savings/savings';
import { Percentage } from '../../../models/statistics/percentage';
import { Tax } from '../../../models/taxes/tax';
import { WealthProjection } from '../../../models/wealth-projections/wealth-projection';
import { BudgetTableService } from '../../foundations/budgets/budget-table-service';
import { ExpenseOrchestrationService } from '../../orchestrations/expenses/expense-orchestration-service';
import { IncomeOrchestrationService } from '../../orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from '../../orchestrations/roles/role-orchestration-service';
import { SavingStatisticsOrchestrationService } from '../../orchestrations/savings/saving-statistics-orchestration-service';
import { SavingsOrchestrationService } from '../../orchestrations/savings/savings-orchestration-service';

export class BudgetTableAggregationService {
    private readonly budgetTableService: BudgetTableService;
    private readonly roleOrchestrationService: RoleOrchestrationService;
    private readonly incomeOrchestrationService: IncomeOrchestrationService;
    private readonly expensesOrchestrationService: ExpenseOrchestrationService;
    private readonly savingsOrchestrationService: SavingsOrchestrationService;
    private readonly savingStatisticsOrchestrationService: SavingStatisticsOrchestrationService;

    constructor(
        budgetTableService: BudgetTableService,
        roleOrchestrationService: RoleOrchestrationService,
        incomeOrchestrationService: IncomeOrchestrationService,
        expensesOrchestrationService: ExpenseOrchestrationService,
        savingsOrchestrationService: SavingsOrchestrationService,
        savingStatisticsOrchestrationService: SavingStatisticsOrchestrationService
    ) {
        this.budgetTableService = budgetTableService;
        this.roleOrchestrationService = roleOrchestrationService;
        this.incomeOrchestrationService = incomeOrchestrationService;
        this.expensesOrchestrationService = expensesOrchestrationService;
        this.savingsOrchestrationService = savingsOrchestrationService;
        this.savingStatisticsOrchestrationService = savingStatisticsOrchestrationService;
    }

    upsertBudgetTable(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    getBudgetTable(id: string) {
        return this.budgetTableService.getBudgetTable(id);
    }

    addColumn(budgetTable: BudgetTable): BudgetTable {
        budgetTable.wealthProjectionList.push(new WealthProjection());
        this.incomeOrchestrationService.addIncomeToBudgetTable(budgetTable);
        this.expensesOrchestrationService.addExpensesToBudgetTable(budgetTable);
        this.savingsOrchestrationService.addSavingsToBudgetTable(budgetTable);
        this.savingStatisticsOrchestrationService.addSavingStatisticsToBudgetTable(budgetTable);
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
        const updatedIncome = this.incomeOrchestrationService.updateIncomeInBudgetTable(
            budgetTable,
            newIncome,
            tax
        );
        this.savingsOrchestrationService.recalculateSavingsFromIncome(budgetTable, updatedIncome);
        this.savingStatisticsOrchestrationService.updateSavingStatisticsFromIncome(
            budgetTable,
            updatedIncome
        );
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    updateExpenses(budgetTable: BudgetTable, newExpenses: Expenses): BudgetTable {
        const updatedExpenses = this.expensesOrchestrationService.updateExpensesInBudgetTable(
            budgetTable,
            newExpenses
        );
        this.savingsOrchestrationService.recalculateSavingsFromExpenses(
            budgetTable,
            updatedExpenses
        );
        this.savingStatisticsOrchestrationService.updateSavingStatisticsFromExpenses(
            budgetTable,
            updatedExpenses
        );
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    updateSavings(budgetTable: BudgetTable, savings: Savings): BudgetTable {
        this.savingsOrchestrationService.updateSavings(budgetTable, savings);
        this.savingStatisticsOrchestrationService.updateSavingStatistics(budgetTable, savings);
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }
}
