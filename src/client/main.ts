// browserify.js (our library that clumps together all these javascript files)
// needs a "main file" to derive all dependencies from and package up.
// This is that file.

/// <reference path="../common/def/jquery.d.ts"/>

var React : any = require('react');
var AppComponent : any = require('./component/AppComponent.jsx');

// document.addEventListener("deviceready", function() {
// 	React.render(
// 	    React.createElement(AppComponent, 
// 	    	{
// 	    		 'API' : 'http://tinderhouse.herokuapp.com/api'
// 	    		 // 'API' : 'http://localhost:1337/api'
// 	    	}),
// 	    document.getElementById('content'));
// }, false);


React.render(
    React.createElement(AppComponent, 
    	{
    		 'API' : 'http://tinderhouse.herokuapp.com/api'
    		 // 'API' : 'http://localhost:1337/api'
    	}),
    document.getElementById('content'));