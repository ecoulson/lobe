import { BudgetParametersBroker } from '../../../brokers/budget-parameters/budget-parameters-broker';
import { BudgetParameters } from '../../../models/budgets/budget-parameters';

export class BudgetParametersService {
    private readonly budgetParametersBroker: BudgetParametersBroker;

    constructor(budgetParametersBroker: BudgetParametersBroker) {
        this.budgetParametersBroker = budgetParametersBroker;
    }

    getParameters(): BudgetParameters {
        return this.budgetParametersBroker.selectById('');
    }

    updateParameters(budgetParameters: BudgetParameters) {
        return this.budgetParametersBroker.save(budgetParameters);
    }
}
