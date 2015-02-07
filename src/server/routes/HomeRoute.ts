import Route = require('./Route')
import Home = require('../../common/model/Home');
import HomeBuilder = require('../../common/model/HomeBuilder');
import Filter = require('../../common/model/Filter');
import Profile = require('../../common/model/Profile');
import ProfileRecommender = require('../util/ProfileRecommender');

/**
 * Defines the routes for interacting with Home models
 */
class HomeRoute implements Route {
	private static NEXT_HOME_AMOUNT = 10;
	private static HOME_ROUTE = '/api/home/';

	private profileRecommender : ProfileRecommender

	private nonceMap : any;
	private db : any;
	private app : any;

	constructor(app : any, db : any) {
		this.app = app;
		this.db = db;
		this.nonceMap = {};
		this.profileRecommender = new ProfileRecommender();
	}

	/**
	 * Called to initialize home routes
	 */
	public initialize() : void {
		this.app.get(HomeRoute.HOME_ROUTE, (req, res) => { this.getNextHomes(req, res) });
	}

	/**
	 * Knuth shuffle array helper
	 */
	private knuthShuffle(array : any[]) : any[] {
		var currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	/**
	 * Called to get the next homes
	 * @param {any} req The request
	 * @param {any} res The response
	 */
	private getNextHomes(req, res) {
		if (!req.query.nonce) {
			res.json({'error' : 'server error'});
		} else {
			if (!this.nonceMap[req.query.nonce]) {
				this.nonceMap[req.query.nonce] = 0;
			}

			var skip : number = this.nonceMap[req.query.nonce];

			// Profile reconstruction on server side
			var profile : Profile = null;
			if (req.query.profile) {
				profile = Profile.fromJSON(req.query.profile);
			}

			// Filter reconstruction on server side
			var filters : Filter[] = [];
			if (req.query.filters && req.query.filters.length) {
				for (var i = 0; i < req.query.filters.length; i++) {
					filters.push(
						Filter.fromJSON(req.query.filters[i])
					);
				}
			}
			console.log("filters constructed: ");
			console.log(filters);

			this.db.find().toArray((err, homes) => {
					if (!err) {
						// Apply filters to homes
						// TODO: make faster?
						var filteredHomes = homes.filter((home) => {
							var result : boolean = true;
							
							// Apply all filters
							for (var i = 0; i < filters.length; i++) {
								result = result && filters[i].isAllowed(home);
							}

							return result;
						});

						// Get a selection of HomeRoute.NEXT_HOME_AMOUNT of homes
						skip %= (filteredHomes.length - HomeRoute.NEXT_HOME_AMOUNT);
						var finalSelection = filteredHomes.slice(skip, skip + HomeRoute.NEXT_HOME_AMOUNT);

						// Update this client's card location
						this.nonceMap[req.query.nonce] += HomeRoute.NEXT_HOME_AMOUNT;
						this.nonceMap[req.query.nonce] %= (filteredHomes.length - HomeRoute.NEXT_HOME_AMOUNT);

						console.log('total homes returned after filter: ' + filteredHomes.length);
						console.log('selected filteredHomes returned: ' + finalSelection.length);

						res.json({
							'homes' : finalSelection,
							'notification' : this.profileRecommender.generate(profile)
						});
					} else {
						res.json({'error' : 'server error'});
					}
		    });
		}

	}
}

export = HomeRoute;