import { BudgetTable } from '../../models/budgets/budget-table';

export class BudgetTableBroker {
    private readonly budgetTableTable: Map<string, BudgetTable>;

    constructor() {
        this.budgetTableTable = new Map();
    }

    saveBudgetTable(budgetTable: BudgetTable): BudgetTable {
        this.budgetTableTable.set(budgetTable.id, budgetTable);
        return new BudgetTable(budgetTable);
    }

    findBudgetTableById(id: string): BudgetTable {
        return new BudgetTable(this.budgetTableTable.get(id) as BudgetTable);
    }

    deleteBudgetTable(budgetTable: BudgetTable) {
        this.budgetTableTable.delete(budgetTable.id);
        return new BudgetTable(budgetTable);
    }
}
