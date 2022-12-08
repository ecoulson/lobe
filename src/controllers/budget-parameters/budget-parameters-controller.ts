import { BudgetParameters } from '../../models/budgets/budget-parameters';
import { EventHandler } from '../../models/events/event-handler';
import { BudgetParametersOrchestrationService } from '../../services/orchestrations/budgets/budget-parameters-orchestration-service';

export class BudgetParametersController {
    private readonly budgetParametersOrchestrationService: BudgetParametersOrchestrationService;

    constructor(budgetParametersService: BudgetParametersOrchestrationService) {
        this.budgetParametersOrchestrationService = budgetParametersService;
    }

    getParameters(): BudgetParameters {
        return this.budgetParametersOrchestrationService.getBudgetParameters();
    }

    updateParameters(budgetParameters: BudgetParameters) {
        return this.budgetParametersOrchestrationService.updateBudgetParameters(budgetParameters);
    }

    listenForBudgetParameterEvents(eventHandler: EventHandler<BudgetParameters>) {
        this.budgetParametersOrchestrationService.listenForBudgetParametersEvents(eventHandler);
    }
}
