import Profile = require('../../common/model/Profile');

/**
 * A ProfileRecommender generates recommendations to notify the user
 * based on their profile.
 */
class ProfileRecommender {
	private static MYPLAN_THRESHOLD : number = 2000;

	constructor() {}

	/**
	 * Generates an appropriate notification for the given profile
	 * @param  {Profile} profile The user profile
	 * @return {string} The recommendation. Null if none given
	 */
	public generate(profile : Profile) : string {
		console.log("Recommending...");
		if (!profile) return null;

		console.log("Profile salary: " + profile.getSalary());
		if (profile.getSalary() < ProfileRecommender.MYPLAN_THRESHOLD) {
			console.log("Low income match");
			return "Your income may qualify you for MyPlan. <a href=\"data.gov\">Learn more</a>";
		}

		if (Math.random() > 0.5) {
			return 'HouseFact: IP is the percentage of your salary the home costs per year';
		}

		return null;
	}
}

export = ProfileRecommender;