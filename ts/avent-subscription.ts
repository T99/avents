/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:55 PM -- January 16th, 2019.
 *	Project: avents
 */

import { AventNotifier } from "./avent-notifier";
import { AventFilter } from "./avent-filter";

/**
 * An endpoint for avents that are distributed from a given {@link AventNotifier}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AventSubscription<E> {
	
	/**
	 * The {@link AventNotifier}s to which this AventSubscription is linked.
	 */
	private notifier: AventNotifier<E> | undefined;
	
	/**
	 * The {@link AventFilter} that have been added to this AventSubscription.
	 */
	private filters: Array<AventFilter<E>> = [];
	
	/**
	 * The anonymous function responsible for handling incoming avents.
	 */
	private readonly handler: (avent: E) => void;
	
	/**
	 * Initializes a new AventSubscription from a given {@link AventNotifier} and with a given avent handler function.
	 *
	 * @param notifier The 'parent' AventNotifier to which this AventSubscription is linked.
	 * @param handler The anonymous handler function for incoming avents to this AventSubscription.
	 */
	public constructor(notifier: AventNotifier<E>, handler: (avent: E) => void) {
		
		this.notifier = notifier;
		this.handler = handler;
		
	}
	
	/**
	 * Add a new {@link AventFilter} to this AventSubscription that will filter incoming avents.
	 *
	 * @param filter The new AventFilter to add to this AventSubscription.
	 */
	public filter(filter: AventFilter<E>): void {
		
		this.filters.push(filter);
		
	}
	
	/**
	 * Checks that the avent conforms to the filters that have been added to it and then handles the avent via its inner
	 * handler function.
	 *
	 * @param avent The avent for this AventSubscription to handle.
	 */
	public handleAvent(avent: E): void {
		
		// Check to make sure that the filters in place aren't going to reject the avent.
		for (let filter of this.filters) if (!filter.verify(avent)) return;
		
		// Handle the avent.
		this.handler(avent);
		
	}
	
	/**
	 * Unsubscribes/unlinks this AventSubscription from it's parent AventNotifier, disabling the reception of further
	 * avents.
	 *
	 * @return false if this AventSubscription had already been unsubscribed.
	 */
	public unsubscribe(): boolean {
		
		if (this.notifier) {
			
			this.notifier.unsubscribe(this);
			this.notifier = undefined;
			return true;
			
		} else return false;
		
	}
	
}