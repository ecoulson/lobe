import { ExpensesBroker } from '../../../brokers/expenses/expenses-broker';
import { IdBroker } from '../../../brokers/ids/id-broker';
import { Expenses } from '../../../models/expenses/expenses';

export class ExpensesService {
    private readonly expenseBroker: ExpensesBroker;
    private readonly idBroker: IdBroker;

    constructor(expenseBroker: ExpensesBroker, idBroker: IdBroker) {
        this.expenseBroker = expenseBroker;
        this.idBroker = idBroker;
    }

    listExpenses() {
        return this.expenseBroker.selectAll();
    }

    createExpenses(expenses: Expenses): Expenses {
        expenses.id = this.idBroker.generateId();
        return this.expenseBroker.save(expenses);
    }

    updateExpenses(expenses: Expenses): Expenses {
        return this.expenseBroker.save(expenses);
    }

    getExpenses(id: string): Expenses {
        return this.expenseBroker.selectById(id);
    }

    removeExpenses(expenses: Expenses): Expenses {
        return this.expenseBroker.delete(expenses);
    }
}
