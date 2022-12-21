import { Income } from '../../models/incomes/income';
import { IncomeBroker } from './income-broker';

export class InMemoryIncomeBroker implements IncomeBroker {
    private incomeTable: Map<string, Income>;

    constructor() {
        this.incomeTable = new Map();
    }

    selectAll(): Income[] {
        return Array.from(this.incomeTable.values());
    }

    save(income: Income): Income {
        this.incomeTable.set(income.id, income);
        return new Income(income);
    }

    selectById(id: string): Income {
        return new Income(this.incomeTable.get(id) as Income);
    }

    delete(income: Income): Income {
        this.incomeTable.delete(income.id);
        return new Income(income);
    }
}
