import Crawler = require("crawler");
import Pipeline = require('./Pipeline');

/**
 * The CraigslistPipeline crawls seattle apartment ads
 */
class CraigslistPipeline implements Pipeline {
	private static BASE_URL = 'http://seattle.craigslist.org';
	private static STARTING_URL = CraigslistPipeline.BASE_URL + '/search/apa';
	private static ITERATIONS = 1;

	private crawler : any;
	private data : any[];

	private clientCallback : Function;

	private pagesLeft : number;
	private postsLeft : number;

	constructor() {}

	/**
	 * Initializes the pipeline
	 */
	public initialize() : void {
		this.data = [];
		this.pagesLeft = CraigslistPipeline.ITERATIONS;
		this.postsLeft = 0;
		this.crawler = new Crawler({
		    maxConnections : 10,
		    callback : (error, result, $) => { this.processPage(error, result, $); },
		});
	}

	/**
	 * Gets the name of this pipeline
	 * @return {string} The name of the pipeline
	 */
	public getName() : string {
		return "craigslist";
	}

	/**
	 * Called on each page processed by the crawler
	 * @param {any} error  crawler error parameter
	 * @param {any} result crawler result parameter
	 * @param {any} $      crawler virtual DOM construction parameter
	 */
	private processPage(error, result, $) {
		var rows = $('p.row');
		this.postsLeft += rows.length;
		rows.each((index, e) => {
            var elem = $(e);

            var timeStamp = elem.find('time').text();
            var description = elem.find('.pl > a').text();
            var link = elem.find('.pl > a').attr('href');
            link = CraigslistPipeline.BASE_URL + link;
            var price = elem.find('.price').text();
            price = price.trim().replace('$', '');
            var location = elem.find('.pnr > small').text();
            location = location.trim().replace(')', '').replace('(', '');
            var brString = elem.find('.housing').text().split(/[ ]+/)[1];
            var br = brString ? Number(brString.replace('br', '')) : null;

            this.data.push({
            	'timeStamp' : timeStamp,
            	'description' : description,
            	'rentPrice' : price,
            	'address' : location,
            	'link' : link,
            	'bedrooms' : br
            });


            var i = this.data.length - 1;

            this.crawler.queue({
            	uri : link,
            	callback : (error, result, $) => {
            		this.processDetailPage(i, error, result, $);
            	}
            });
        });

		this.pagesLeft--;
	    if (this.pagesLeft > 0) {
	    	var nextLink = $('.button.next').attr('href');
	    	this.crawler.queue(CraigslistPipeline.BASE_URL + nextLink);
	    }
	}

	/**
	 * Called on each detail page processed by the crawler
	 * @param {number} index The data index for this detail page
	 * @param {any} error  crawler error parameter
	 * @param {any} result crawler result parameter
	 * @param {any} $      crawler virtual DOM construction parameter
	 */
	private processDetailPage(index : number, error, result, $) {
		
		this.data[index].lon = $('#map').data('longitude');
		this.data[index].lat = $('#map').data('latitude');

		this.postsLeft--;
		if (this.postsLeft == 0 && this.pagesLeft == 0) {
			this.clientCallback(this, this.data);
		}
	}

	/**
	 * Gets the name of this pipeline
	 * @param {Function} callback The completion callback to call after finishing
	 */
	public 	run(callback : Function) : void {
		this.clientCallback = callback;
		this.crawler.queue(CraigslistPipeline.STARTING_URL);
	}
}

export = CraigslistPipeline;