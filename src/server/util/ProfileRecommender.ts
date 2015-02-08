import Profile = require('../../common/model/Profile');

/**
 * A ProfileRecommender generates recommendations to notify the user
 * based on their profile.
 */
class ProfileRecommender {
	private static MYPLAN_THRESHOLD : number = 28000;

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

		if (Math.random() > 0.3) {
			if(Math.random() > .5)
				return 'Fun HouseFact: IP is the % of income spent on home';
			else
				return 'Fun HouseFact: Cost-Burdened: when more than 30% of income(IP) is spent on housing'
		}

		return null;
	}
}

export = ProfileRecommender;