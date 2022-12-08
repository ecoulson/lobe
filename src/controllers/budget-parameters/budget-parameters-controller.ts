import { BudgetParameters } from '../../models/budgets/budget-parameters';
import { BudgetParametersService } from '../../services/foundations/budgets/budget-parameters-service';

export class BudgetParametersController {
    private readonly budgetParametersService: BudgetParametersService;

    constructor(budgetParametersService: BudgetParametersService) {
        this.budgetParametersService = budgetParametersService;
    }

    getParameters(): BudgetParameters {
        return this.budgetParametersService.getParameters();
    }

    updateParameters(budgetParameters: BudgetParameters) {
        return this.budgetParametersService.updateParameters(budgetParameters);
    }
}
