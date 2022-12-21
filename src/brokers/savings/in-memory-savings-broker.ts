import { Savings } from '../../models/savings/savings';
import { SavingsBroker } from './savings-broker';

export class InMemorySavingsBroker implements SavingsBroker {
    private savingsTable: Map<string, Savings>;

    constructor() {
        this.savingsTable = new Map();
    }

    selectAll() {
        return Array.from(this.savingsTable.values());
    }

    save(savings: Savings): Savings {
        this.savingsTable.set(savings.id, savings);
        return new Savings(savings);
    }

    selectById(id: string): Savings {
        return new Savings(this.savingsTable.get(id) as Savings);
    }

    delete(savings: Savings): Savings {
        this.savingsTable.delete(savings.id);
        return new Savings(savings);
    }
}
