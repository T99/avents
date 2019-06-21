import { AventNotifier } from "./avent-notifier";
import { AventFilter } from "./avent-filter";
export declare class AventSubscription<E> {
    private notifier;
    private filters;
    private readonly handler;
    constructor(notifier: AventNotifier<E>, handler: (avent: E) => void);
    filter(filter: AventFilter<E>): void;
    handleAvent(avent: E): void;
    unsubscribe(): boolean;
}
