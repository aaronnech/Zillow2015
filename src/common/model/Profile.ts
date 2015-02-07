/**
 * A Profile is the profile of a house searcher
 * We use this to filter and alter their home results
 * to best suit their needs. This is also used for suggestions
 * and improvements to unique-situations
 */
class Profile {
	private salary : number;
	private age : number;
	private quizResponses : any;

	constructor() {
		this.salary = undefined;
		this.age = undefined;
		this.quizResponses = [];
	}

	/**
	 * Pushes a quiz response onto the stack
	 * @param {any} v The quiz response
	 */
	public pushQuizResponse(v : any) {
		this.quizResponses.push(v);
	}

	/**
	 * Gets the quiz responses
	 * @return {any[]} The quiz responses
	 */
	public getQuizResponses() {
		return this.quizResponses;
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
	public getSalary() {
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
	public getAge() {
		return this.age;
	}

	/**
	 * Converts a profile into JSON form for transition
	 * @return {any} The JSON form of the person
	 */
	public toJSON() {
		return {
			'age' : this.age,
			'salary' : this.salary,
			'quizResponses' : this.quizResponses
		};
	}

	/**
	 * Converts a profile into JSON form for transition
	 * @param {any} json The JSON form of the person
	 * @return {Profile} The model profile
	 */
	public static fromJSON(json) : Profile {
		var profile : Profile = new Profile();

		profile.setAge(json.age || undefined);
		profile.setSalary(json.salary || undefined);
		if (json.quizResponses) {
			for (var i = 0; i < json.quizResponses.length; i++) {
				profile.pushQuizResponse(json.quizResponses[i]);
			}
		}

		return profile;
	}
}

export = Profile;