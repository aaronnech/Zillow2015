import Pipeline = require('./Pipeline');

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
			var lon = row.length - 3;
			var lat = row.length - 4;
			var taken = 10;
			var desc = 9;
			console.log(row[taken]);
			if (row[taken] != 'Rented') {
				result.push({
						'lat' : Number(row[lat]),
						'lon' : Number(row[lon]),
						'description' : row[desc]
					});
			}
		}

		callback(this, result);
	}
}

export = AccessibleKingCountyPipeline;