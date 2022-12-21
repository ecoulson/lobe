import { Expenses } from '../../models/expenses/expenses';
import { ExpensesBroker } from './expenses-broker';

export class InMemoryExpensesBroker implements ExpensesBroker {
    private expensesTable: Map<string, Expenses>;

    constructor() {
        this.expensesTable = new Map();
    }

    selectAll() {
        return Array.from(this.expensesTable.values());
    }

    save(expenses: Expenses): Expenses {
        this.expensesTable.set(expenses.id, expenses);
        return new Expenses(expenses);
    }

    selectById(id: string): Expenses {
        return new Expenses(this.expensesTable.get(id) as Expenses);
    }

    delete(expenses: Expenses): Expenses {
        this.expensesTable.delete(expenses.id);
        return new Expenses(expenses);
    }
}
