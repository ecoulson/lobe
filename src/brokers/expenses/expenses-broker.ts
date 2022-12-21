import { Expenses } from '../../models/expenses/expenses';
import { StorageBroker } from '../storage/storage-broker';

export interface ExpensesBroker extends StorageBroker<Expenses> {}
