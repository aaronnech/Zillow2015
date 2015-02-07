/// <reference path="../common/def/node-uuid.d.ts"/>
import JQuery = require('jquery');
import uuid = require('node-uuid');

import Constants = require('./Constants');

import Profile = require('../common/model/Profile');
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
	private firstLaunch : boolean;

	private profile : Profile;
	private filters : any;

	private butterQueue : string[];

	private notifyFunctions : Function[];

	/**
	 * Constructs the API service
	 * @param {string}   baseUrl         base URL of the API
	 * @param {Function} timeoutCallback callback to execute if a connection times out
	 */
	constructor(baseUrl : string, timeoutCallback : Function) {
		this.baseUrl = baseUrl;
		this.timeoutCallback = timeoutCallback;
		this.secret = this.constructSecret();
		this.notifyFunctions = [];
		this.butterQueue = [];
		this.profile = undefined;

		this.loadFilterStore();

		var nonce = window.localStorage.getItem('nonce');
		if (nonce) {
			this.nonce = nonce;
			this.firstLaunch = false;
		} else {
			this.firstLaunch = true;
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
	 * Sets the profile of this API
	 * @param {Profile} profile The user profile
	 */
	public setProfile(profile : Profile) {
		this.profile = profile;
	}

	/**
	 * Returns whether a filter is enabled or not
	 * @param {string} name The name of the filter
	 * @return {boolean} true if the filter is enabled, false otherwise.
	 *                        If the filter is not set, returns true.
	 */
	public isFilterEnabled(name : string) {
		if (!this.filters[name]) {
			return true;
		}
		return !this.filters[name].isDisabled();
	}

	/**
	 * Helper to load filters into the API from localstorage
	 */
	private loadFilterStore() {
		this.filters = {};
		var json = window.localStorage.getItem('filters');
		if (!json) {
			return;
		} else {
			json = JSON.parse(json);
			for (var id in json) {
				if (this.filters.hasOwnProperty(id)) {
					this.filters[id] = Filter.fromJSON(json[id]);
				}
			}
		}
	}

	/**
	 * Helper to update local filters and save it into local storage
	 */
	private updateFilterStore() {
		var json = {};
		for (var id in this.filters) {
			if (this.filters.hasOwnProperty(id)) {
				json[id] = this.filters[id].toJSON();
			}
		}
		window.localStorage.setItem('filters', JSON.stringify(this.filters));
	}

	/**
	 * Disables the given filter by name
	 * @param {string} name The filter name
	 * @param {Filter} filter The user filter
	 */
	public disableFilter(name : string, filter : Filter) {
		this.filters[name] = filter;
		this.filters[name].disableFilter();

		this.updateFilterStore();
	}

	/**
	 * Enables (or updates) the given filter by name
	 * @param {string} name The filter name
	 * @param {Filter} filter The user filter
	 */
	public enableFilter(name : string, filter : Filter) {
		this.filters[name] = filter;
		this.filters[name].enableFilter();

		this.updateFilterStore();
	}

	/**
	 * Finds out if this is the first time a user has used the app.
	 * @return {boolean} true if this is the first time a user has launched
	 *                      the application, false otherwise.
	 */
	public isFirstLaunch() : boolean {
		return this.firstLaunch;
	}

	/**
	 * Gets the next butter bar message
	 * @return {string} Message
	 */
	public getNextButterBar() {
		if (this.butterQueue.length > 0) {
			var message : string = this.butterQueue.shift();
			return message;
		}

		return "";
	}

	/**
	 * Registers a callback to notify when a response from the server
	 * has been recieved.
	 * @param {Function} f The response function
	 */
	public notifyMe(f : Function) {
		this.notifyFunctions.push(f);
	}

	/**
	 * Processes the meta data that piggybacks off other
	 * requests
	 * @param {any} res Response json object
	 */
	private processMeta(res) {
		if (res.notification) {
			this.butterQueue.push(res.notification);
		}
	}

	/**
	 * Get the filters as a JSON object to be passed to the server
	 */
	private getFilterJSON() {
		var result = [];
		for (var prop in this.filters) {
			if (this.filters.hasOwnProperty(prop) && this.filters[prop]) {
		    	result.push(this.filters[prop].toJSON());
			}
		}

		return result;
	}

	/**
	 * Gets the next set of homes, along with other piggy-back meta data
	 * @param {Filter[]} filters to apply to the candidate homes
	 * @param {Function} callback callback to return the result to.
	 */
	public getNextHomes(callback : Function) {
		var filters = this.getFilterJSON();
		var profile = this.profile.toJSON();
		console.log(profile);

		JQuery.get(this.baseUrl + '/home/',
				{key : this.secret,
				 nonce : this.nonce,
				 filters : filters,
				 profile : profile},
				(data) => {
					if (!data.error) {
						this.processMeta(data);
						callback(data.homes.map((json) => {
							return new Home(HomeBuilder.fromJSON(json));
						}));


						for (var i = 0; i < this.notifyFunctions.length; i++) {
							this.notifyFunctions[i]();
						}
					} else {
						callback(undefined);
					}
				}
		);
	}
}

export = API;