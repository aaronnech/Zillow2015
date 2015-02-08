import Pipeline = require('./Pipeline');
import Request = require('request');

/**
 * Annotates housing with a safety rating between 0-1 depending on
 * statistics generated from other datasets about the area.
 */
class HomeSafetyMetaPipeline implements Pipeline {
	private static POLICE_INCIDENT : string = "https://data.seattle.gov/resource/3k2p-39jp.json";

	private home : any;

	constructor() {

	}

	/**
	 * Initializes the pipeline
	 * @param {any} data Optional init data
	 */
	public initialize(data ?: any) : void {
		this.home = data;
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
		var lat = this.home.lat;
		var lon = this.home.lon;
		Request({
					url : HomeSafetyMetaPipeline.POLICE_INCIDENT,
					qs : {
							$where : 'within_circle(incident_location, '
									  + lat
									  + ', '
									  + lon
									  + ', 1000) AND event_clearance_date > \'2015-01-20\''
						}
				}, (err, response, body) => {
					var finished = this.home;
					if (response.body) {
						finished.securityHits = JSON.parse(response.body).length;
					} else {
						finished.securityHits = 0;
					}
					callback(this, finished);
				}
		);
	}
}

export = HomeSafetyMetaPipeline;