import { IdBroker } from '../../../brokers/ids/id-broker';
import { IncomeBroker } from '../../../brokers/incomes/income-broker';
import { Income } from '../../../models/incomes/income';

export class IncomeService {
    private readonly incomeBroker: IncomeBroker;
    private readonly idBroker: IdBroker;

    constructor(incomeBroker: IncomeBroker, idBroker: IdBroker) {
        this.incomeBroker = incomeBroker;
        this.idBroker = idBroker;
    }

    listIncomes(): Income[] {
        return this.incomeBroker.selectAll();
    }

    createIncome(income: Income): Income {
        income.id = this.idBroker.generateId();
        return this.incomeBroker.save(income);
    }

    updateIncome(income: Income): Income {
        return this.incomeBroker.save(income);
    }

    getIncome(id: string): Income {
        return this.incomeBroker.selectById(id);
    }

    removeIncome(income: Income): Income {
        return this.incomeBroker.delete(income);
    }
}
