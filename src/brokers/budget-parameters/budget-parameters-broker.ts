import { BudgetParameters } from '../../models/budgets/budget-parameters';

export class BudgetParametersBroker {
    private budgetParameters: BudgetParameters;

    constructor(budgetParameters: BudgetParameters) {
        this.budgetParameters = budgetParameters;
    }

    retrieveBudgetParameters(): BudgetParameters {
        return this.budgetParameters;
    }

    modifyBudgetParameters(budgetParameters: BudgetParameters): BudgetParameters {
        this.budgetParameters = new BudgetParameters(budgetParameters);
        return this.budgetParameters;
    }
}
