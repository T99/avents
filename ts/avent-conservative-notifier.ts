/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:06 PM -- June 21st, 2019.
 *	Website: avents
 */

import { AventNotifier } from "./avent-notifier";
import { AventSubscription } from "./avent-subscription";

/**
 * An {@link AventNotifier} that only listens for avents when there are active subscriptions.
 *
 * This is often useful when working with DOM event listeners - AventConservativeNotifiers will only register avent
 * listeners on elements when there are active subscriptions to said AventConservativeNotifier.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AventConservativeNotifier<E = any> extends AventNotifier<E> {
	
	/**
	 * The function that enables avent listening/incoming avents for this AventConservativeNotifier.
	 */
	private readonly enableFunction: () => any;
	
	/**
	 * The function that disables avent listening/incoming avents for this AventConservativeNotifier.
	 */
	private readonly disableFunction: () => any;
	
	/**
	 * A boolean value indicating whether or not this AventConservativeNotifier is currently enabled (is listening for
	 * avents).
	 */
	private enabled: boolean;
	
	/**
	 * Initializes a new AventConservativeNotifier with a given enable and disable function.
	 *
	 * Care should be taken when creating new instances or subtypes of this class to ensure that the disable function
	 * effectively and fully reverses/disables whatever actions the enable function took to direct avents to this
	 * class/instance.
	 *
	 * @param enableFunction A function responsible for enabling incoming avents to this instance.
	 * @param disableFunction A function responsible for disabling incoming avents to this instance.
	 */
	public constructor(enableFunction: () => any, disableFunction: () => any) {
		
		super();
		
		this.enableFunction = enableFunction;
		this.disableFunction = disableFunction;
		this.enabled = false;
		
	}
	
	/**
	 * Creates and returns an {@link AventSubscription} to this AventNotifier that will be notified whenever avents are
	 * dispatched on this object, and conditionally enables incoming input if incoming avents are not already enabled.
	 *
	 * @param handler A function that will handle the incoming avent.
	 * @return An AventSubscription to this AventConservativeNotifier.
	 */
	public subscribe(handler: (avent: E) => void): AventSubscription<E> {
		
		if ((this.subscriptionCount() <= 0) && !this.enabled) {
			
			this.enabled = true;
			this.enableFunction();
			
		}
		
		return super.subscribe(handler);
		
	}
	
	/**
	 * Unsubscribes/unlinks the provided {@link AventSubscription} from this AventNotifier so that said subscription
	 * will no longer be notified of any new incoming avents to this AventNotifier. Conditionally disables incoming
	 * input if incoming avents are not already disabled.
	 *
	 * @param subscription The AventSubscription to unsubscribe from this AventNotifier.
	 */
	public unsubscribe(subscription: AventSubscription<E>): void {
		
		if ((this.subscriptionCount() - 1 >= 0) && this.enabled) {
			
			this.enabled = false;
			this.disableFunction();
			
		}
		
		super.unsubscribe(subscription);
		
	}
	
	/**
	 * Returns true if this AventConservativeNotifier is currently enabled (is listening for avents).
	 *
	 * @return true if this AventConservativeNotifier is currently enabled (is listening for avents).
	 */
	public isEnabled(): boolean {
		
		return this.enabled;
		
	}
	
}