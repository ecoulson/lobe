import { Event } from '../../models/events/event';
import { EventEmitter } from '../../events/event-emitter';
import { EventHandler } from '../../models/events/event-handler';

export class EventBroker {
    private readonly eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter;
    }

    publish(event: Event) {
        this.eventEmitter.emit(event);
    }

    subscribe(type: string, handler: EventHandler) {
        this.eventEmitter.on(type, handler);
    }

    unsubscribe(type: string, handler: EventHandler) {
        this.eventEmitter.off(type, handler);
    }
}
