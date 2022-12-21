import { BudgetParameters } from '../../models/budgets/budget-parameters';
import { StorageBroker } from '../storage/storage-broker';

export interface BudgetParametersBroker extends StorageBroker<BudgetParameters> {}
