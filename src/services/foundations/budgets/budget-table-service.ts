import { BudgetTableBroker } from '../../../brokers/budgets/budget-table-broker';
import { BudgetTable } from '../../../models/budgets/budget-table';

export class BudgetTableService {
    private readonly budgetTableBroker: BudgetTableBroker;

    constructor(budgetTableBroker: BudgetTableBroker) {
        this.budgetTableBroker = budgetTableBroker;
    }

    getBudgetTable(id: string): BudgetTable {
        return this.budgetTableBroker.findBudgetTableById(id);
    }

    upsertBudgetTable(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableBroker.saveBudgetTable(budgetTable);
    }

    removeBudgetTable(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableBroker.deleteBudgetTable(budgetTable);
    }
}
