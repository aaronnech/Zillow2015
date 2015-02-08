import HomeBuilder = require('./HomeBuilder');

/**
 * A model that represents a Home, and all possible attributes of one.
 */
class Home {
	private builder : HomeBuilder;

	constructor(builder : HomeBuilder) {
		this.builder = builder;
	}

	// Getters
	public getDescription() : string { return this.builder.getDescription(); }
	public getImage() : string { return this.builder.getImage(); }
	public getRentPrice() : number { return this.builder.getRentPrice(); }
	public getBuyPrice() : number { return this.builder.getBuyPrice(); }
	public getAddress() : string { return this.builder.getAddress(); }
	public getLink() : string { return this.builder.getLink(); }
	public getLat() : number { return this.builder.getLat(); }
	public getLon() : number { return this.builder.getLon(); }
	public getBedrooms() : number { return this.builder.getBedrooms(); }
	public getAccessibility() : any { return this.builder.getAccessibility(); }
	public getCrimeCount() : number { return this.builder.getCrimeCount(); }

	public toJSON() : any {
		return {
			'description' : this.builder.getDescription(),
			'image' : this.builder.getImage(),
			'address' : this.builder.getAddress(),
			'rentPrice' : this.builder.getRentPrice(),
			'buyPrice' : this.builder.getBuyPrice(),
			'link' : this.builder.getLink(),
			'lon' : this.builder.getLon(),
			'lat' : this.builder.getLat(),
			'bedrooms' : this.builder.getBedrooms(),
			'accessibility' : this.builder.getAccessibility(),
			'getCrimeCount' : this.builder.getCrimeCount()
		};
	}
}

export = Home;