/**
 * Builder that is used to create the home card model.
 */
class HomeBuilder {
	private description : string;
	private image : string;
	private rentPrice : number;
	private buyPrice : number;
	private link : string;
	private lat : number;
	private lon : number;
	private accessibility : any;

	// Constructor
	constructor() {}

	/**
	 * Constructs a HomeBuilder from
	 * @param {any} json The JSON to construct from
	 */
	public static fromJSON(json : any) : HomeBuilder {
		return (new HomeBuilder())
				.setLon(json.lon || undefined)
				.setLat(json.lat || undefined)
				.setDescription(json.description || null)
				.setImage(json.image || undefined)
				.setLink(json.link || undefined)
				.setRentPrice(json.rentPrice || undefined)
				.setAccessibility(json.accessibility || undefined);
	}

	// Getters
	public getDescription() : string { return this.description; }
	public getImage() : string { return this.image; }
	public getRentPrice() : number { return this.rentPrice; }
	public getBuyPrice() : number { return this.buyPrice; }
	public getLink() : string { return this.link; }
	public getLat() : number { return this.lat; }
	public getLon() : number { return this.lon; }
	public getAccessibility() : any { return this.accessibility; }

	// Setters
	public setAccessibility(accessibility : any) : HomeBuilder {
		this.accessibility = accessibility;
		return this;
	}

	public setLat(lat : number) : HomeBuilder {
		this.lat = lat;
		return this;
	}

	public setLon(lon : number) : HomeBuilder {
		this.lon = lon;
		return this;
	}

	public setDescription(description : string) : HomeBuilder {
		this.description = description;
		return this;
	}

	public setImage(image : string) : HomeBuilder {
		this.image = image;
		return this;
	}

	public setLink(link : string) : HomeBuilder {
		this.link = link;
		return this;
	}

	public setRentPrice(rentPrice : number) : HomeBuilder {
		this.rentPrice = rentPrice;
		return this;
	}

	public setBuyPrice(buyPrice : number) : HomeBuilder {
		this.buyPrice = buyPrice;
		return this;
	}
}

export = HomeBuilder;