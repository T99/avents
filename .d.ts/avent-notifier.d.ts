import { AventSubscription } from "./avent-subscription";
import { AventFilter } from "./avent-filter";
import { AventSource } from "./avent-source";
export declare class AventNotifier<E = any> implements AventSource {
    private filters;
    private readonly subscriptions;
    constructor();
    notify(avent: E): void;
    filter(filter: AventFilter<E>): void;
    subscribe(handler: (avent: E) => void): AventSubscription<E>;
    unsubscribe(subscription: AventSubscription<E>): void;
    subscriptionCount(): number;
    getAsAventSource(): AventSource<E>;
}
