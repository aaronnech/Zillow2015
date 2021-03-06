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
	private bedrooms : number;
	private accessibility : any;
	private address : string;
	private crimeCount : number;

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
				.setAccessibility(json.accessibility || undefined)
				.setBedrooms(json.bedrooms || null)
				.setCrimeCount(json.securityHits || 0)
				.setAddress(json.address || undefined);
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
	public getAddress() : string { return this.address; }
	public getBedrooms() : number { return this.bedrooms; }
	public getCrimeCount() : number { return this.crimeCount; }

	// Setters
	public setAccessibility(accessibility : any) : HomeBuilder {
		this.accessibility = accessibility;
		return this;
	}

	public setCrimeCount(count : number) : HomeBuilder {
		this.crimeCount = count;
		return this;
	}

	public setAddress(address : string) : HomeBuilder {
		this.address = address;
		return this;
	}

	public setBedrooms(bedrooms : number) : HomeBuilder {
		this.bedrooms = bedrooms;
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