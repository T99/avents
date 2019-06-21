import { AventSubscription } from "./avent-subscription";
export interface AventSource<E = any> {
    subscribe(handler: (avent: E) => any): AventSubscription<E>;
}
