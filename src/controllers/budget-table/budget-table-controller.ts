import { BudgetTable } from '../../models/budget/budget-table';
import { BudgetTableAggregationService } from '../../services/aggregations/budget-tables/budget-table-aggregation-service';

export class BudgetTableController {
    private readonly budgetTableAggregationService: BudgetTableAggregationService;

    constructor(budgetTableAggregationService: BudgetTableAggregationService) {
        this.budgetTableAggregationService = budgetTableAggregationService;
    }

    upsertBudgetTable(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableAggregationService.upsertBudgetTable(budgetTable)
    }

    getBudgetTable(id: string): BudgetTable {
        return this.budgetTableAggregationService.getBudgetTable(id);
    }

    addColumn(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableAggregationService.addColumn(budgetTable);
    }
}
