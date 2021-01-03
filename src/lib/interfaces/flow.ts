import { Secuence } from './secuence';

export interface Flow{
    // A function to add new elements to the flow
    add: Function;
    commute: Function;
    error: Function;
    next: Function;
    queue: {
        current: number;
        total: number;
    };
    secuence: Secuence[];
    sort: Function;
    start: Function;
}