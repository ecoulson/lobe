import { IdBroker } from '../../../brokers/ids/id-broker';
import { SavingStatisticsBroker } from '../../../brokers/savings/saving-statistics-broker';
import { SavingStatistics } from '../../../models/savings/saving-statistics';

export class SavingStatisticsService {
    private readonly savingStatisticsBroker: SavingStatisticsBroker;
    private readonly idBroker: IdBroker;

    constructor(savingsBroker: SavingStatisticsBroker, idBroker: IdBroker) {
        this.savingStatisticsBroker = savingsBroker;
        this.idBroker = idBroker;
    }

    listSavingStatistics() {
        return this.savingStatisticsBroker.selectAll();
    }

    createSavingStatistics(savings: SavingStatistics): SavingStatistics {
        savings.id = this.idBroker.generateId();
        return this.savingStatisticsBroker.save(savings);
    }

    updateSavingStatistics(savings: SavingStatistics): SavingStatistics {
        return this.savingStatisticsBroker.save(savings);
    }

    getSavingStatistics(id: string): SavingStatistics {
        return this.savingStatisticsBroker.selectById(id);
    }

    removeSavingStatistics(savings: SavingStatistics): SavingStatistics {
        return this.savingStatisticsBroker.delete(savings);
    }
}
