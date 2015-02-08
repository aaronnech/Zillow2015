import Pipeline = require('./Pipeline');

/**
 * Gets homes from a collection of accessibility data on homes
 */
class AccessibleKingCountyPipeline implements Pipeline {
	private static FILE : string = "../source/kingcountyaccessible.json";
	private data : any;

	constructor() {}
	
	/**
	 * Initializes the pipeline
	 */
	public initialize() : void {
		this.data = require(AccessibleKingCountyPipeline.FILE);
	}

	/**
	 * Gets the name of this pipeline
	 * @return {string} The name of the pipeline
	 */
	public getName() : string {
		return "kkaccessible";
	}

	/**
	 * Gets the name of this pipeline
	 * @param {Function} callback The completion callback to call after finishing
	 */
	public run(callback : Function) : void {
		var result : any = [];
		
		for (var i : number = 0; i < this.data.data.length; i++) {
			var row : any = this.data.data[i];
			var loc : any = row[row.length - 1];

			// Access indicies
			var address = row.length - 2;
			var lon = loc.length - 3;
			var lat = loc.length - 4;
			var taken = 10;
			var desc = 9;

			if (row[taken] != 'Rented') {
				result.push({
						'lat' : Number(loc[lat]),
						'lon' : Number(loc[lon]),
						'description' : row[desc],
						'address' : row[address]
					});
			}
		}

		callback(this, result);
	}
}

export = AccessibleKingCountyPipeline;