import { SavingStatistics } from '../../models/savings/saving-statistics';
import { SavingStatisticsBroker } from './saving-statistics-broker';

export class InMemorySavingStatisticsBroker implements SavingStatisticsBroker {
    private savingStatisticsTable: Map<string, SavingStatistics>;

    constructor() {
        this.savingStatisticsTable = new Map();
    }

    selectAll(): SavingStatistics[] {
        return Array.from(this.savingStatisticsTable.values());
    }

    save(savings: SavingStatistics): SavingStatistics {
        this.savingStatisticsTable.set(savings.id, savings);
        return new SavingStatistics(savings);
    }

    selectById(id: string): SavingStatistics {
        return new SavingStatistics(this.savingStatisticsTable.get(id) as SavingStatistics);
    }

    delete(savings: SavingStatistics): SavingStatistics {
        this.savingStatisticsTable.delete(savings.id);
        return new SavingStatistics(savings);
    }
}
