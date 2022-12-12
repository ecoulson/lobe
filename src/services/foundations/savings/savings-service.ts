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
        return this.savingsBroker.listSavings();
    }

    createSavings(savings: Savings): Savings {
        savings.id = this.idBroker.generateId();
        return this.savingsBroker.saveSavings(savings);
    }

    updateSavings(savings: Savings): Savings {
        return this.savingsBroker.saveSavings(savings);
    }

    getSavings(id: string): Savings {
        return this.savingsBroker.findSavingsById(id);
    }

    removeSavings(savings: Savings): Savings {
        return this.savingsBroker.deleteSavings(savings);
    }
}
