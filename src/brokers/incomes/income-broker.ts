import { Income } from '../../models/incomes/income';
import { StorageBroker } from '../storage/storage-broker';

export interface IncomeBroker extends StorageBroker<Income> {}
