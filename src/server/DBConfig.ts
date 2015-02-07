/**
 * Configurations for server mongo database.
 */
class DBConfig {
	public static USERNAME : string = "TINDERHAUS";
	public static PASSWORD : string = "foobar";
	public static DB_NAME : string = "tinderhouse";
	public static URL : string = "mongodb://" +
						DBConfig.USERNAME +
						":" +
						DBConfig.PASSWORD +
						"@ds039431.mongolab.com:39431/" +
						DBConfig.DB_NAME;
}

export = DBConfig;
