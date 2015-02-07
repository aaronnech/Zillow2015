import Pipeline = require('./pipeline/Pipeline');
import CraigslistPipeline = require('./pipeline/CraigslistPipeline');
import AccessibleKingCountyPipeline = require('./pipeline/AccessibleKingCountyPipeline');

/**
 * Main utility to harvest data from various data pipelines
 * and store it in the database.
 */
class Harvester {
	private pipelines : Pipeline[];
	private db : any;
	private runningCount : number;
	private finishedCallback : Function;

	constructor(db : any) {
		// TODO: Take database connection as parameter
		this.pipelines = [
			new CraigslistPipeline(),
			new AccessibleKingCountyPipeline()
		];
		this.db = db;
	}

	/**
	 * Empties the database of all data
	 * @param {Function} callback Callback to call when finished
	 */
	private emptyDatabase(callback : Function) : void {
		//TODO: Empty database
		this.db.drop(() => {
			callback();
		});
	}

	/**
	 * Called when a pipeline finishes executing,
	 * if all pipelines are finished executing, it will callback to the
	 * client of this harvester provided in the run() method.
	 * @param {Pipeline} pipeline The pipeline that finished
	 * @param {any} result   The resultant data
	 */
	private onFinishPipeline(pipeline : Pipeline, result : any) {
		// Mark data source
		for (var i = 0; i < result.length; i++) {
			result[i].source = pipeline.getName();
		}
		if (pipeline.getName() == 'Accessible King County Pipeline') {
			console.log(result);
		}

		// Insert data into database
		this.db.insert(result, () => {
			// Check to see if we are done
			this.runningCount--;
			console.log(this.runningCount + " Pipelines left");
			if (this.runningCount == 0) {
				this.finishedCallback();
			}
		});
	}

	/**
	 * Runs the harvester
	 * @param {Function} callback [description]
	 */
	public run(callback : Function) : void {
		console.log("Cleaning database...");
		this.emptyDatabase(() => {
			console.log("Database clean");
			console.log("Initializing Data Pipelines...");
			
			// Initialize all pipelines
			for (var i = 0; i < this.pipelines.length; i++) {
				this.pipelines[i].initialize();
			}

			// Run all pipelines
			// TODO: Make multithreaded.
			this.runningCount = this.pipelines.length;
			this.finishedCallback = callback;
			for (var i = 0; i < this.pipelines.length; i++) {
				console.log("Starting Pipeline: " + this.pipelines[i].getName());
				this.pipelines[i].run((pipeline, result) => {
					console.log("Finished Pipeline: " + pipeline.getName());
					console.log("Inserting Pipeline: " + pipeline.getName());
					this.onFinishPipeline(pipeline, result);
				});
			}
		});
	}
}

export = Harvester;