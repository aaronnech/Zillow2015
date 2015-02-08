/// <reference path="../common/def/node.d.ts"/>
/// <reference path="../common/def/express.d.ts"/>
/// <reference path="../common/def/mongodb.d.ts"/>
/// <reference path="../common/def/body-parser.d.ts"/>
/// <reference path="../common/def/node-uuid.d.ts"/>
/// <reference path="../common/def/request.d.ts"/>

import express = require('express');
import bodyParser = require('body-parser');
import mongodb = require('mongodb');
import uuid = require('node-uuid');
import DBConfig = require('./DBConfig');

// Routes
import HomeRoute = require('./routes/HomeRoute');
import MiscRoute = require('./routes/MiscRoute');

// Security token
var TOKEN = '8345445d8345445foo16777199d0foo33513461d8518063foo50290559d16863562foo67108717d25299697foo';

// Create application
var MongoClient = mongodb.MongoClient;
var app = express();

// Middleware for application
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/*', function(req, res, next) {
	var key = req.body.key || req.query.key;
	if (key == TOKEN) {
		next();
	} else {
		res.json({'error' : 'invalid request'});
	}
});

// Connect to mongo
MongoClient.connect(DBConfig.URL, (err, db) => {
	if(!err) {
		var homes = db.collection('homes');

		// Construct routes
		(new HomeRoute(app, homes)).initialize();
		(new MiscRoute(app, uuid)).initialize();

		// start webserver
		app.use(express.static(__dirname + '/../client/static'));
		app.listen(process.env.PORT || 1337);
		console.log('Listening on port 1337...');
	} else {
		console.log('Error connecting to mongodb:');
		console.log(err);
	}
});

