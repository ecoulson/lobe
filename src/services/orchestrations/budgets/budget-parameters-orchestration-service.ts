import { BudgetParameters } from '../../../models/budgets/budget-parameters';
import { EventHandler } from '../../../models/events/event-handler';
import { BudgetParametersEventService } from '../../foundations/budgets/budget-parameters-event-service';
import { BudgetParametersService } from '../../foundations/budgets/budget-parameters-service';

export class BudgetParametersOrchestrationService {
    private readonly budgetParametersService: BudgetParametersService;
    private readonly budgetParametersEventService: BudgetParametersEventService;

    constructor(
        budgetParametersService: BudgetParametersService,
        budgetParametersEventService: BudgetParametersEventService
    ) {
        this.budgetParametersEventService = budgetParametersEventService;
        this.budgetParametersService = budgetParametersService;
    }

    listenForBudgetParametersEvents(eventHandler: EventHandler<BudgetParameters>) {
        this.budgetParametersEventService.subscribeToBudgetParametersUpdatedEvent(eventHandler);
    }

    updateBudgetParameters(updatedBudgetParameters: BudgetParameters) {
        updatedBudgetParameters =
            this.budgetParametersService.updateParameters(updatedBudgetParameters);
        this.budgetParametersEventService.publishBudgetParametersUpdateEvent(
            updatedBudgetParameters
        );
        return updatedBudgetParameters;
    }

    getBudgetParameters() {
        return this.budgetParametersService.getParameters();
    }
}
