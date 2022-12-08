import { Event } from '../models/events/event';
import { EventHandler } from '../models/events/event-handler';

export class EventEmitter {
    private readonly eventHandlerLookup: Map<string, EventHandler[]>;

    constructor() {
        this.eventHandlerLookup = new Map();
    }

    emit(event: Event) {
        const handlers = this.eventHandlerLookup.get(event.type);
        handlers?.forEach((handler) => {
            handler(event);
        });
    }

    on(type: string, handler: EventHandler) {
        if (!this.eventHandlerLookup.has(type)) {
            this.eventHandlerLookup.set(type, []);
        }
        this.eventHandlerLookup.get(type)!.push(handler);
    }

    off(type: string, handler: EventHandler) {
        const handlers = this.eventHandlerLookup.get(type);
        if (handlers) {
            const filteredHandlers = handlers.filter((storedHandler) => handler !== storedHandler);
            this.eventHandlerLookup.set(type, filteredHandlers);
        }
    }
}
