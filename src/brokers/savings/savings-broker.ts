import { Savings } from '../../models/savings/savings';

export class SavingsBroker {
    private savingsTable: Map<string, Savings>;

    constructor() {
        this.savingsTable = new Map();
    }

    listSavings() {
        return Array.from(this.savingsTable.values());
    }

    saveSavings(savings: Savings): Savings {
        this.savingsTable.set(savings.id, savings);
        return new Savings(savings);
    }

    findSavingsById(id: string): Savings {
        return new Savings(this.savingsTable.get(id) as Savings);
    }

    deleteSavings(savings: Savings): Savings {
        this.savingsTable.delete(savings.id);
        return new Savings(savings);
    }
}
