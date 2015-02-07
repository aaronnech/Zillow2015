import Pipeline = require('./pipeline/Pipeline');
import CraigslistPipeline = require('./pipeline/CraigslistPipeline');
import AccessibleKingCountyPipeline = require('./pipeline/AccessibleKingCountyPipeline');

import HomeSafetyMetaPipeline = require('./pipeline/HomeSafetyMetaPipeline');

/**
 * Main utility to harvest data from various data pipelines
 * and store it in the database.
 */
class Harvester {
	private sourcePipelines : Pipeline[];
	private metaPipelines : Pipeline[];
	private db : any;
	private runningCount : number;
	private finishedCallback : Function;
	private metaRunning : number;

	constructor(db : any) {
		this.metaRunning = 0;
		this.sourcePipelines = [
			new CraigslistPipeline(),
			new AccessibleKingCountyPipeline()
		];
		this.metaPipelines = [
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
		// Post-process data source
		for (var i = 0; i < result.length; i++) {
			// Tag the data source on the home
			result[i].source = pipeline.getName();

			this.metaRunning += this.metaPipelines.length;

			// Run all meta pipelines on these sources
			for (var j = 0; j < this.metaPipelines.length; j++) {
				var meta = this.metaPipelines[j];

				meta.initialize(result[i]);

				// Closure up the index
				((meta, i, result) => {
					meta.run((pipeline, metaTagged) => {
						this.metaRunning--;

						console.log('Finished meta pipeline : ' + pipeline.getName());
						console.log('Meta Pipelines remaining : ' + this.metaRunning);

						result[i] = metaTagged;
					});
				})(meta, i, result);
			}
		}


		// Do nothing while the meta pipelines are running
		while (this.metaRunning > 0) {}

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
			for (var i = 0; i < this.sourcePipelines.length; i++) {
				this.sourcePipelines[i].initialize();
			}

			// Run all pipelines
			// TODO: Make multithreaded.
			this.runningCount = this.sourcePipelines.length;
			this.finishedCallback = callback;
			for (var i = 0; i < this.sourcePipelines.length; i++) {
				console.log("Starting Pipeline: " + this.sourcePipelines[i].getName());
				this.sourcePipelines[i].run((pipeline, result) => {
					console.log("Finished Pipeline: " + pipeline.getName());
					console.log("Inserting Pipeline: " + pipeline.getName());
					this.onFinishPipeline(pipeline, result);
				});
			}
		});
	}
}

export = Harvester;