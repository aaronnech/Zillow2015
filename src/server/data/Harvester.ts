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
	private db : any;
	private runningCount : number;
	private finishedCallback : Function;

	constructor(db : any) {
		this.sourcePipelines = [
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
		var metaRunning = 0;

		console.log('Starting Meta Pipelines:  on ' + result.length + ' homes');
		this.runningCount++;
		// Post-process data source
		for (var i = 0; i < result.length; i++) {
			// Tag the data source on the home
			result[i].source = pipeline.getName();
			var metaPipelines = [
				new HomeSafetyMetaPipeline()
			];
			// Run all meta pipelines on these sources
			for (var j = 0; j < metaPipelines.length; j++) {
				var meta = metaPipelines[j];

				meta.initialize(result[i]);

				metaRunning++;
				// Closure up the index
				((meta, i, result) => {
					meta.run((pipeline, metaTagged) => {
						metaRunning--;
						result[i] = metaTagged;
					});
				})(meta, i, result);
			}
		}

		var wait = (() => {
			if (metaRunning > 0) {
				setTimeout(wait, 100);
			} else {
				console.log("Finished Meta Pipeline");
				console.log('-------------INSERT : ' + result.length + ' documents');
				// Insert data into database
				this.db.insert(result, (err) => {
					console.log("Insertion finished.");
					this.runningCount--;
					if (this.runningCount == 0) {
						console.log("Harvester done. Calling back.");
						this.finishedCallback();
					}
				});
			}
		});

		setTimeout(wait, 100);
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
					this.runningCount--;
					console.log("Finished Pipeline: " + pipeline.getName());
					this.onFinishPipeline(pipeline, result);
				});
			}
		});
	}
}

export = Harvester;