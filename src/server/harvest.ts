/// <reference path="../common/def/crawler.d.ts"/>
/// <reference path="../common/def/mongodb.d.ts"/>

import mongodb = require('mongodb');
import Harvester = require('./data/Harvester');
import DBConfig = require('./DBConfig');

var MongoClient = mongodb.MongoClient;

MongoClient.connect(DBConfig.URL, (err, db) => {
	if(!err) {
		var harvester : Harvester = new Harvester(db.collection('homes'));

		// Run the harvester
		harvester.run(() => {
			console.log('Finished Harvesting Data');
			process.exit(0);
		});
	} else {
		console.log('Error connecting to mongodb:');
		console.log(err);
	}
});