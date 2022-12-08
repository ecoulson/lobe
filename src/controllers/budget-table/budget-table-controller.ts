import { BudgetColumn } from '../../models/budgets/budget-column';
import { BudgetParameters } from '../../models/budgets/budget-parameters';
import { BudgetTable } from '../../models/budgets/budget-table';
import { EventHandler } from '../../models/events/event-handler';
import { Expenses } from '../../models/expenses/expenses';
import { Income } from '../../models/incomes/income';
import { Role } from '../../models/roles/role';
import { Savings } from '../../models/savings/savings';
import { BudgetTableAggregationService } from '../../services/aggregations/budget-tables/budget-table-aggregation-service';

export class BudgetTableController {
    private readonly budgetTableAggregationService: BudgetTableAggregationService;

    constructor(budgetTableAggregationService: BudgetTableAggregationService) {
        this.budgetTableAggregationService = budgetTableAggregationService;
    }

    upsertBudgetTable(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableAggregationService.upsertBudgetTable(budgetTable);
    }

    getBudgetTable(id: string): BudgetTable {
        return this.budgetTableAggregationService.getBudgetTable(id);
    }

    getBudgetColumn(budgetTable: BudgetTable, index: number) {
        return this.budgetTableAggregationService.getBudgetColumn(budgetTable, index);
    }

    addColumn(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableAggregationService.addColumn(budgetTable);
    }

    updateRole(budgetTable: BudgetTable, role: Role) {
        return this.budgetTableAggregationService.updateRole(budgetTable, role);
    }

    updateIncome(budgetTable: BudgetTable, income: Income) {
        return this.budgetTableAggregationService.updateIncome(budgetTable, income);
    }

    updateExpenses(budgetTable: BudgetTable, expenses: Expenses) {
        return this.budgetTableAggregationService.updateExpenses(budgetTable, expenses);
    }

    updateSavings(budgetTable: BudgetTable, savings: Savings) {
        return this.budgetTableAggregationService.updateSavings(budgetTable, savings);
    }

    listenForBudgetParameterEvents(eventHandler: EventHandler<BudgetParameters>) {
        this.budgetTableAggregationService.listenForBudgetParameterEvents(eventHandler);
    }
}
