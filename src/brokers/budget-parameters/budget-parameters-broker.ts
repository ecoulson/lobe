import { BudgetParameters } from '../../models/budget/budget-parameters';

export class BudgetParametersBroker {
    private readonly budgetParameters: BudgetParameters;

    constructor(budgetParameters: BudgetParameters) {
        this.budgetParameters = budgetParameters;
    }

    retrieveBudgetParameters(): BudgetParameters {
        return this.budgetParameters;
    }
}
