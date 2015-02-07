/**
 * Annotates housing with a safety rating between 0-1 depending on
 * statistics generated from other datasets about the area.
 */
class HomeSafetyMetaPipeline implements Pipeline {
	constructor() {

	}

	/**
	 * Initializes the pipeline
	 * @param {any} data Optional init data
	 */
	public initialize(data ?: any) : void {

	}

	/**
	 * Gets the name of this pipeline
	 * @return {string} The name of the pipeline
	 */
	public getName() : string {
		return "safety";
	}

	/**
	 * Gets the name of this pipeline
	 * @param {Function} callback The completion callback to call after finishing
	 */
	public run(callback : Function) : void {

	}
}

export = HomeSafetyMetaPipeline;