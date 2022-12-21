import { BudgetParameters } from '../../models/budgets/budget-parameters';
import { BudgetParametersBroker } from './budget-parameters-broker';

export class InMemoryBudgetParametersBroker implements BudgetParametersBroker {
    private budgetParameters: BudgetParameters;

    constructor(budgetParameters: BudgetParameters) {
        this.budgetParameters = budgetParameters;
    }

    selectAll(): BudgetParameters[] {
        return [this.budgetParameters];
    }

    selectById(id: string): BudgetParameters {
        return this.budgetParameters;
    }

    save(budgetParameters: BudgetParameters): BudgetParameters {
        this.budgetParameters = new BudgetParameters(budgetParameters);
        return this.budgetParameters;
    }

    delete(entity: BudgetParameters): BudgetParameters {
        return entity;
    }
}
