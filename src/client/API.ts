/// <reference path="../common/def/node-uuid.d.ts"/>
import JQuery = require('jquery');
import uuid = require('node-uuid');
import Constants = require('./Constants');
import Filter = require('../common/model/Filter');
import Home = require('../common/model/Home');
import HomeBuilder = require('../common/model/HomeBuilder');

declare var window : any;

/**
 * Provides an interface to the server for the front end application
 */
class API {
	private baseUrl : string;
	private timeoutCallback : Function;
	private secret : string;
	private nonce : string;

	/**
	 * Constructs the API service
	 * @param {string}   baseUrl         base URL of the API
	 * @param {Function} timeoutCallback callback to execute if a connection times out
	 */
	constructor(baseUrl : string, timeoutCallback : Function) {
		this.baseUrl = baseUrl;
		this.timeoutCallback = timeoutCallback;
		this.secret = this.constructSecret();
		var nonce = window.localStorage.getItem('nonce');
		if (nonce) {
			this.nonce = nonce;
		} else {
			this.nonce = this.getNonce();
			window.localStorage.setItem('nonce', this.nonce);
		}
	}

	/**
	 * Get a cryptographic UUID to be used as an indentifier.
	 * @return {string} The identifier.
	 */
	private getNonce() : string {
		return uuid.v4();
	}

	/**
	 * Constructs a deterministic client key for security against API spam,
	 * having the key constructed in this manner makes it harder to find in the
	 * uglified / minified source code.
	 * (may eventually get cracked, but the API is read-only).
	 * 
	 * Will construct the following key:
	 * 8345445d8345445foo16777199d0foo33513461d8518063foo50290559d16863562foo67108717d25299697foo
	 * (comments will be erased by minification).
	 */
	private constructSecret() : string {
		var seed = 8345445;
		var secret = "";
		for (var i = 0; i < 5; i++) {
			secret += (seed | (i * 2 * seed)) + "d" + (seed ^ (i * seed)) + "foo";
		}
		return secret;
	}


	/**
	 * Gets the next set of homes
	 * @param {Filter[]} filters to apply to the candidate homes
	 * @param {Function} callback callback to return the result to.
	 */
	public getNextHomes(callback : Function) {
		JQuery.get(this.baseUrl + '/home/', {key : this.secret, nonce : this.nonce, filters : []}, (data) => {
			if (!data.error) {
				callback(data.homes.map((json) => {
					return new Home(HomeBuilder.fromJSON(json));
				}));
			} else {
				callback(undefined);
			}
		});
	}
}

export = API;