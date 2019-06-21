/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:19 PM -- January 16th, 2019.
 *	Project: avents
 */

/**
 * Filters avents by way of a 'validator' function passed in the constructor of this class.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AventFilter<E> {
	
	/**
	 * The function that actually checks avent conformity to this filter.
	 */
	private readonly filter: (avent: E) => boolean;
	
	/**
	 * Initializes a new AventFilter with the provided filter function.
	 *
	 * @param filter The function that actually checks avent conformity to this filter.
	 */
	public constructor(filter: (avent: E) => boolean) {
		
		this.filter = filter;
		
	}
	
	/**
	 * Returns true if the provided avent passes this AventFilter.
	 *
	 * @param avent The avent to check for conformity to this filter.
	 * @return true if the provided avent passes this AventFilter.
	 */
	public verify(avent: E): boolean {
		
		return this.filter(avent);
		
	}
	
}