import { Income } from '../../models/incomes/income';

export class IncomeBroker {
    private incomeTable: Map<string, Income>;

    constructor() {
        this.incomeTable = new Map();
    }

    listIncomes(): Income[] {
        return Array.from(this.incomeTable.values());
    }

    saveIncome(income: Income): Income {
        this.incomeTable.set(income.id, income);
        return new Income(income);
    }

    findIncomeById(id: string): Income {
        return new Income(this.incomeTable.get(id) as Income);
    }

    deleteIncome(income: Income): Income {
        this.incomeTable.delete(income.id);
        return new Income(income);
    }
}
