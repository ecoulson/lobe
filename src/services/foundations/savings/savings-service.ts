import { IdBroker } from '../../../brokers/ids/id-broker';
import { SavingsBroker } from '../../../brokers/savings/savings-broker';
import { Savings } from '../../../models/savings/savings';

export class SavingsService {
    private readonly savingsBroker: SavingsBroker;
    private readonly idBroker: IdBroker;

    constructor(savingsBroker: SavingsBroker, idBroker: IdBroker) {
        this.savingsBroker = savingsBroker;
        this.idBroker = idBroker;
    }

    listSavings() {
        return this.savingsBroker.selectAll();
    }

    createSavings(savings: Savings): Savings {
        savings.id = this.idBroker.generateId();
        return this.savingsBroker.save(savings);
    }

    updateSavings(savings: Savings): Savings {
        return this.savingsBroker.save(savings);
    }

    getSavings(id: string): Savings {
        return this.savingsBroker.selectById(id);
    }

    removeSavings(savings: Savings): Savings {
        return this.savingsBroker.delete(savings);
    }
}
