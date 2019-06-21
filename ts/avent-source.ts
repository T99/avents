/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:37 AM -- June 21st, 2019.
 *	Website: avents
 */

import { AventSubscription } from "./avent-subscription";

/**
 * An interface that solely exposes a subscription functionality so that implementing classes may return this interface
 * rather than their own type contract.
 *
 * This should help direct (but not ensure) other classes using AventNotifiers to NOT have outside sources dispatching/
 * notifying avents on their AventSource implementations.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface AventSource<E = any> {
	
	/**
	 * Creates and returns an {@link AventSubscription} to this AventSource that will be notified whenever avents are
	 * dispatched on this object.
	 *
	 * @param handler A function that will handle the incoming avent.
	 * @return An AventSubscription to this AventSource.
	 */
	subscribe(handler: (avent: E) => any): AventSubscription<E>;
	
}