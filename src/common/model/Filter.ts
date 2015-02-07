/**
 * A filter is a wrapper for a function that can be applied
 * across a collection to remove models that don't match.
 */
class Filter {
	private allowed : Function;
	private disabled : boolean;

	/**
	 * Constructs a new Filter
	 * @param {Function} allowed The filter function
	 */
	constructor(allowed : Function, disabled? : boolean) {
		if (typeof allowed == 'undefined' || !allowed) {
			throw 'Illegal filter construction over a undefined function';
		}
		this.allowed = allowed;
		this.disabled = disabled || false;
	}

	/**
	 * Applies this filter to the given collection, returning a new
	 * collection without the filtered elements
	 * @param  {any[]} collection The collection to filter
	 * @return {any[]} a new filtered collection
	 */
	public apply(collection) : any[] {
		var result : any[] = [];
		for (var i = 0; i < collection.length; i++) {
			if (this.allowed(collection[i]) || this.disabled) {
				result.push(collection[i]);
			}
		}

		return result;
	}

	/**
	 * Disables the filter, meaning the filter will let all elements pass.
	 */
	public disableFilter() {
		this.disabled = true;
	}

	/**
	 * Enables
	 */
	public enableFilter() {
		this.disabled = false;
	}

	/**
	 * Converts this filter to a JSON object
	 * @return {any} The json representation
	 */
	public toJSON() : any {
		return {
			fn : this.allowed.toString(),
			disabled : this.disabled
		}
	}

	/**
	 * Alternative constructor from a JSON object
	 * @param {any} json The constructing JSON
	 */
	public static fromJSON(json) {
		return new Filter(eval('(' + json.fn + ')'), json.disabled);
	}
}

export = Filter;