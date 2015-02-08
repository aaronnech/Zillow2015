/**
 * A filter is a wrapper for a function that can be applied
 * across a collection to remove models that don't match.
 */
class Filter {
	//TODO: For safety purposes, we shouldn't directly take a function
	//		from the client (although we can sandbox).
	//		Instead create a dictionary of every filter function
	//		and refer to that such that it is clean.

	private allowed : Function;
	private disabled : boolean;
	private value : any;

	/**
	 * Constructs a new Filter
	 * @param {Function} allowed The filter function
	 * @param {any} value The value to pass the filter function
	 */
	constructor(allowed : Function, value : any, disabled? : boolean) {
		if (typeof allowed == 'undefined' || !allowed) {
			throw 'Illegal filter construction over a undefined function';
		}

		this.value = value
		this.allowed = allowed;
		this.disabled = disabled;
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
			if (this.isAllowed(collection[i])) {
				result.push(collection[i]);
			}
		}

		return result;
	}

	/**
	 * Applies this filter to the given element, returning true if it passed.
	 * @param  {any} element The element to filter
	 * @return {boolean} True if it passes, false otherwise.
	 */
	public isAllowed(element) : boolean {
		return this.disabled || this.allowed(element, this.value);
	}

	/**
	 * Set the processing function of this filter
	 * @param {Function} allowed The filter function
	 */
	public setAllowed(allowed : Function) {
		this.allowed = allowed;
	}

	/**
	 * Set the processing function value of this filter
	 * @param {any} allowed The filter function value
	 */
	public setValue(value : any) {
		this.value = value;
	}

	/**
	 * Gets the disabled status of the filter
	 * @return {boolean} true if it is disabled, false otherwise
	 */
	public isDisabled() {
		return this.disabled;
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
			value : this.value,
			disabled : this.disabled
		}
	}

	/**
	 * Alternative constructor from a JSON object
	 * @param {any} json The constructing JSON
	 */
	public static fromJSON(json) {
		if (typeof json.disabled == 'string') {
			json.disabled = json.disabled == 'true';
		}
		return new Filter(eval('(' + json.fn + ')'), json.value, json.disabled);
	}
}

export = Filter;