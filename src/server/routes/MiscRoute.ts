import Route = require('./Route')

/**
 * Defines the routes for interacting with miscellaneous endpoints
 */
class MiscRoute implements Route {
	private static MISC_ROUTE = '/api/misc/';

	private uuid : any;
	private app : any;

	constructor(app : any, uuid : any) {
		this.app = app;
		this.uuid = uuid;
	}

	/**
	 * Called to initialize home routes
	 */
	public initialize() : void {
		this.app.get(MiscRoute.MISC_ROUTE + '/nonce', (req, res) => { this.getNonce(req, res) });
	}

	/**
	 * Called to get a nonce
	 * @param {any} req The request
	 * @param {any} res The response
	 */
	private getNonce(req, res) {
		res.json({'nonce' : this.uuid.v4()});
	}
}

export = MiscRoute;