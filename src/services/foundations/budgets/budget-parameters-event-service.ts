import { EventBroker } from '../../../brokers/events/event-broker';
import { BudgetParameters } from '../../../models/budgets/budget-parameters';
import { Event } from '../../../models/events/event';
import { EventHandler } from '../../../models/events/event-handler';

export class BudgetParametersEventService {
    private readonly eventBroker: EventBroker;

    constructor(eventBroker: EventBroker) {
        this.eventBroker = eventBroker;
    }

    publishBudgetParametersUpdateEvent(updatedBudgetParameters: BudgetParameters) {
        this.eventBroker.publish(
            new Event({
                type: 'BudgetParametersUpdated',
                data: updatedBudgetParameters,
            })
        );
    }

    subscribeToBudgetParametersUpdatedEvent(handler: EventHandler<BudgetParameters>) {
        this.eventBroker.subscribe('BudgetParametersUpdated', handler);
    }
}
