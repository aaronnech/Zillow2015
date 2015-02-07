import Route = require('./Route')
import Home = require('../../common/model/Home');
import HomeBuilder = require('../../common/model/HomeBuilder');
import Filter = require('../../common/model/Filter');

/**
 * Defines the routes for interacting with Home models
 */
class HomeRoute implements Route {
	private static NEXT_HOME_AMOUNT = 3;
	private static HOME_ROUTE = '/api/home/';

	private nonceMap : any;
	private db : any;
	private app : any;

	constructor(app : any, db : any) {
		this.app = app;
		this.db = db;
		this.nonceMap = {};
	}

	/**
	 * Called to initialize home routes
	 */
	public initialize() : void {
		this.app.get(HomeRoute.HOME_ROUTE, (req, res) => { this.getNextHomes(req, res) });
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
			this.db.count((err, amount) => {
				skip %= (amount - HomeRoute.NEXT_HOME_AMOUNT);
				this.db.find().skip(skip).limit(HomeRoute.NEXT_HOME_AMOUNT).toArray((err, homes) => {
					if (!err) {
						this.nonceMap[req.query.nonce] += HomeRoute.NEXT_HOME_AMOUNT;
						this.nonceMap[req.query.nonce] %= (amount - HomeRoute.NEXT_HOME_AMOUNT);
						console.log(this.nonceMap[req.query.nonce]);
						res.json({'homes' : homes});
					} else {
						res.json({'error' : 'server error'});
					}
			    });
			});	
		}

	}
}

export = HomeRoute;