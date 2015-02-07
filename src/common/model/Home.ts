import HomeBuilder = require('./HomeBuilder');

/**
 * A model that represents a Home, and all possible attributes of one.
 */
class Home {
	private description : string;
	private image : string;
	private rentPrice : number;
	private buyPrice : number;
	private link : string;

	constructor(builder : HomeBuilder) {
		this.description = builder.getDescription();
		this.image = builder.getImage();
		this.rentPrice = builder.getRentPrice();
		this.buyPrice = builder.getBuyPrice();
		this.link = builder.getLink();
	}

	// Getters
	public getDescription() : string { return this.description; }
	public getImage() : string { return this.image; }
	public getRentPrice() : number { return this.rentPrice; }
	public getBuyPrice() : number { return this.buyPrice; }
	public getLink() : string { return this.link; }

	public toJSON() : any {
		return {
			'description' : this.description,
			'image' : this.image,
			'rentPrice' : this.rentPrice,
			'buyPrice' : this.buyPrice,
			'link' : this.link
		};
	}
}

export = Home;