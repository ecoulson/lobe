import { SavingStatistics } from '../../models/savings/saving-statistics';
import { StorageBroker } from '../storage/storage-broker';

export interface SavingStatisticsBroker extends StorageBroker<SavingStatistics> {}
