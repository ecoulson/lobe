import { Event } from './event';

export type EventHandler<T = any> = (event: Event<T>) => void;
