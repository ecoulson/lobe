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
        return this.incomeBroker.listIncomes();
    }

    createIncome(income: Income): Income {
        income.id = this.idBroker.generateId();
        return this.incomeBroker.saveIncome(income);
    }

    updateIncome(income: Income): Income {
        return this.incomeBroker.saveIncome(income);
    }

    getIncome(id: string): Income {
        return this.incomeBroker.findIncomeById(id);
    }

    removeIncome(income: Income): Income {
        return this.incomeBroker.deleteIncome(income);
    }
}
