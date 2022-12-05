import { Expenses } from "../../models/expenses/expenses";

export class ExpenseBroker {
    private expensesTable: Map<string, Expenses>;

    constructor() {
        this.expensesTable = new Map();
    }

    saveExpenses(expenses: Expenses): Expenses {
        this.expensesTable.set(expenses.id, expenses);
        return new Expenses(expenses);
    }

    findExpensesById(id: string): Expenses {
        return new Expenses(this.expensesTable.get(id) as Expenses);
    }

    deleteExpenses(expenses: Expenses): Expenses {
        this.expensesTable.delete(expenses.id);
        return new Expenses(expenses);
    }
}
