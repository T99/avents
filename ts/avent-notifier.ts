/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:45 PM -- January 16th, 2019.
 *	Project: avents
 */

import { AventSubscription } from "./avent-subscription";
import { AventFilter } from "./avent-filter";
import { AventSource } from "./avent-source";

/**
 * A source for avents that are distributed to multiple {@link AventSubscription}s (event handlers).
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AventNotifier<E = any> implements AventSource {
	
	/**
	 * The {@link AventFilter}s that have been added to this AventNotifier.
	 */
	private filters: Array<AventFilter<E>> = [];
	
	/**
	 * The {@link AventSubscription}s that have been created with/linked to this AventSubscription.
	 *
	 * This AventNotifier is responsible for notifying any AventSubscriptions in this array with any new avents that it
	 * is notified of.
	 */
	private readonly subscriptions: Array<AventSubscription<E>> = [];
	
	/**
	 * Initializes a new AventNotifier.
	 */
	public constructor() { /* Do nothing. */ }
	
	/**
	 * Notifies all of the {@link AventSubscription}s that are live on this AventNotifier of the avent that is passed in
	 * to this function.
	 *
	 * @param avent The avent to distribute to all of this AventNotifier's children AventSubscriptions.
	 */
	public notify(avent: E): void {
		
		// Check to make sure that the filters in place aren't going to reject the avent.
		for (let filter of this.filters) if (!filter.verify(avent)) return;
		
		// Notify all of the subscriptions.
		for (let subscription of this.subscriptions) subscription.handleAvent(avent);
		
	}
	
	/**
	 * Add a new {@link AventFilter} to this AventNotifier that will filter incoming avents.
	 *
	 * @param filter The new AventFilter to add to this AventNotifier.
	 */
	public filter(filter: AventFilter<E>): void {
		
		this.filters.push(filter);
		
	}
	
	/**
	 * Creates and returns an {@link AventSubscription} to this AventNotifier that will be notified whenever avents are
	 * dispatched on this object.
	 *
	 * @param handler A function that will handle the incoming avent.
	 * @return An AventSubscription to this AventNotifier.
	 */
	public subscribe(handler: (avent: E) => void): AventSubscription<E> {
		
		let subscription: AventSubscription<E> = new AventSubscription<E>(this, handler);
		
		this.subscriptions.push(subscription);
		
		return subscription;
		
	}
	
	/**
	 * Unsubscribes/unlinks the provided {@link AventSubscription} from this AventNotifier so that said subscription
	 * will no longer be notified of any new incoming avents to this AventNotifier.
	 *
	 * @param subscription The AventSubscription to unsubscribe from this AventNotifier.
	 */
	public unsubscribe(subscription: AventSubscription<E>): void {
		
		let indexOf: number = this.subscriptions.indexOf(subscription);
		if (indexOf > -1) this.subscriptions.splice(indexOf, 1);
		
	}
	
	/**
	 * Returns the number of {@link AventSubscription}s to this AventNotifier.
	 *
	 * @return The number of {@link AventSubscription}s to this AventNotifier.
	 */
	public subscriptionCount(): number {
		
		return this.subscriptions.length;
		
	}
	
	/**
	 * Returns this AventNotifier as an {@link AventSource} in order to only expose it's
	 * {@link AventNotifier#subscribe()} method.
	 *
	 * @return This AventNotifier as an AventSource in order to only expose it's #subscribe() method.
	 */
	public getAsAventSource(): AventSource<E> {
		
		return this;
		
	}
	
}