import { Savings } from '../../models/savings/savings';
import { StorageBroker } from '../storage/storage-broker';

export interface SavingsBroker extends StorageBroker<Savings> {}
