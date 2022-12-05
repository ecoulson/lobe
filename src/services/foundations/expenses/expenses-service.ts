import { ExpenseBroker } from '../../../brokers/expenses/expense-broker';
import { IdBroker } from '../../../brokers/ids/id-broker';
import { Expenses } from '../../../models/expenses/expenses';

export class ExpensesService {
    private readonly expenseBroker: ExpenseBroker;
    private readonly idBroker: IdBroker;

    constructor(expenseBroker: ExpenseBroker, idBroker: IdBroker) {
        this.expenseBroker = expenseBroker;
        this.idBroker = idBroker;
    }

    createExpenses(expenses: Expenses): Expenses {
        expenses.id = this.idBroker.generateId();
        return this.expenseBroker.saveExpenses(expenses);
    }

    updateExpenses(expenses: Expenses): Expenses {
        return this.expenseBroker.saveExpenses(expenses);
    }

    getExpenses(id: string): Expenses {
        return this.expenseBroker.findExpensesById(id);
    }

    removeExpenses(expenses: Expenses): Expenses {
        return this.expenseBroker.deleteExpenses(expenses);
    }
}
