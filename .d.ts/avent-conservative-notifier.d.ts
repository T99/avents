import { AventNotifier } from "./avent-notifier";
import { AventSubscription } from "./avent-subscription";
export declare class AventConservativeNotifier<E = any> extends AventNotifier<E> {
    private readonly enableFunction;
    private readonly disableFunction;
    private enabled;
    constructor(enableFunction: () => any, disableFunction: () => any);
    subscribe(handler: (avent: E) => void): AventSubscription<E>;
    unsubscribe(subscription: AventSubscription<E>): void;
    isEnabled(): boolean;
}
