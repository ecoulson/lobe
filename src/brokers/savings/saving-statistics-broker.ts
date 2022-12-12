import { SavingStatistics } from '../../models/savings/saving-statistics';

export class SavingStatisticsBroker {
    private savingStatisticsTable: Map<string, SavingStatistics>;

    constructor() {
        this.savingStatisticsTable = new Map();
    }

    listSavingStatistics(): SavingStatistics[] {
        return Array.from(this.savingStatisticsTable.values());
    }

    saveSavingStatistics(savings: SavingStatistics): SavingStatistics {
        this.savingStatisticsTable.set(savings.id, savings);
        return new SavingStatistics(savings);
    }

    findSavingStatisticsById(id: string): SavingStatistics {
        return new SavingStatistics(this.savingStatisticsTable.get(id) as SavingStatistics);
    }

    deleteSavingStatistics(savings: SavingStatistics): SavingStatistics {
        this.savingStatisticsTable.delete(savings.id);
        return new SavingStatistics(savings);
    }
}
