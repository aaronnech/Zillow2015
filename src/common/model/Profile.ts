/**
 * A Profile is the profile of a house searcher
 * We use this to filter and alter their home results
 * to best suit their needs. This is also used for suggestions
 * and improvements to unique-situations
 */
class Profile {
	private salary : number;
	private age : number;

	constructor() {
		this.salary = undefined;
		this.age = undefined;
	}

	/**
	 * Sets the salary
	 * @param {number} v The salary
	 */
	public setSalary(v : number) {
		this.salary = v;
	}

	/**
	 * Gets the salary
	 * @return {number} The salary
	 */
	public getSalary(v : number) {
		return this.salary;
	}

	/**
	 * Sets the age
	 * @param {number} v The age
	 */
	public setAge(v : number) {
		this.age = v;
	}

	/**
	 * Gets the age
	 * @return {number} The age
	 */
	public getAge(v : number) {
		return this.age;
	}

	/**
	 * Converts a profile into JSON form for transition
	 * @return {any} The JSON form of the person
	 */
	public toJSON() {
		return {
			'age' : this.age,
			'salary' : this.salary
		};
	}

	/**
	 * Converts a profile into JSON form for transition
	 * @param {any} json The JSON form of the person
	 * @return {Profile} The model profile
	 */
	public static fromJSON(json) :  {
		var profile : Profile = new Profile();
		profile.setAge(json.age);
		profile.setSalary(json.salary);
		
		return profile;
	}
}