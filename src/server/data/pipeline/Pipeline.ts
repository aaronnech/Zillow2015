/**
 * A pipeline defines a flow of data from an external source to the database
 */
interface Pipeline {
	/**
	 * Initializes the pipeline
	 * @param {any} data Optional init data
	 */
	initialize(data ?: any) : void;

	/**
	 * Gets the name of this pipeline
	 * @return {string} The name of the pipeline
	 */
	getName() : string;

	/**
	 * Gets the name of this pipeline
	 * @param {Function} callback The completion callback to call after finishing
	 */
	run(callback : Function) : void;
}

export = Pipeline;