Description
-----------

This is the CasualHome Project from two humble UW CSE Developers Aaron Nech(@aaronnech) and Daniel Noteboom(@djnoteboom) for the Zillow Winter 2015 Hackathon.


We believe that searching for a home should be relaxing, not stressful! CasualHome is a mobile application where we seek to learn as much about people as possible through their profile and help match them with homes and  for a home during any amount of time. While using the app, a personalized profile will be learned over use (swiping homes, taking quizes, and filling out demographic information). It utilizes a aggregated data model and profile intelligence to only show you houses you're interested in from many sources.

Technologies, APIs, and Datasets Utilized
-----------------------------------------

### Technologies

Client
-TypeScript
-React JS
-Browserify
-JQuery
-Cordova (PhoneGap)

Server
-TypeScript
-HammerJS
-ExpressJS
-MongoDB


### Datasets

Seattle Crime Rates (data.seattle.gov)
King County Accessible Homes Data (`src/server/data/source/kingcountyaccessibility.json`)
Craigslist (http://seattle.craigslist.org)

### APIS

Seattle Data API (data.seattle.gov)

Architecture
------------

### Client Overview

![Image of Client](https://github.com/aaronnech/Zillow2015/raw/master/ASSET/client.png)

### Server Overview

![Image of Server](https://github.com/aaronnech/Zillow2015/raw/master/ASSET/server.png)

### Harvester / Data Pipeline (detailed)

![Image of Harvester](https://github.com/aaronnech/Zillow2015/raw/master/ASSET/harvester.png)

Set Up
------
Run the following from the root directory:

`npm install`
  
to install project dependencies into a folder called `node_modules`

And then:

`npm run-script serve`

To compile all TypeScript, and launch the main.js server located in the `server` directory, you can instead run:

`npm run-script make`

To just compile all TypeScript.


Methodology Overview
--------------------
Both Client and Server are written in TypeScript and ultimately compiled to JavaScript. This is cool because:

1. Both Client and Server can share code. For example the client and server both use a Pizza object for various functionality, we only need to write that object once (this kind of code I'm calling `common` and goes in the `src/common` directory).
2. We use NodeJS to run server code on a server computer
3. We use Browserify to scoop up all the seperate JavaScript files and bundle them into one JavaScript include for the browser platform.


Directory Breakdown
-------------------

There are three main directories in the source:

1. `src/server` - This contains all code only pertaining to the server side application.
2. `src/client` - This contains all code only pertaining to the client side application. Browserify is used with the start point `client/main.ts` to scoop up all client code and bundle it into `client/static/js/main.js`
3. `src/common` - This contains all code that is shared by both client and server. Including files such as typescript definitions. NodeJS processes dependencies on its own via support for `require()`, so any `src/server` code that depends on common code will do so automatically. `src/client` code will scoop up common code via the same mechanism, but employed by Browserify.

Vendors
-------

Vendor files are files that do not naturally belong to the application, but need to be used (e.g. libraries). If a library has an equivalent NPM package, you can just use `require()` as normal after installation via NPM and both the client and server will have support to get the dependency (the client via Browserify).

If the library is client and does not have a NPM package, you will need to place it in `src/client/static/js/vendor` where it can be safely allowed by the gitignore. You then need to include it manually through the `index.html` file. This is rarely ever necessary though because NPM has literally everything.

PhoneGap Android Support
------------------------

To run the application on android simply run:

`npm run-script android`

Assuming you have all the dependencies installed (e.g. cordova, android SDK, emulator / deviced plugged in). This script will create a `_cordova` directory which will contain a copy of your post-compiled `src/client/static` directory, and some settings copied in.

Development Style
-----------------

The application development style I follow is similar to many Java applications:

- Every class resides in their own TypeScript file
- Every class TypeScript file ends with an `export = ClassName;` statement to make itself available for import
- Every class that depends on another class, imports that class via `import ClassName = require('/path-to-class/ClassName');`
- Every class TypeScript file is named as `ClassName.ts`

License
-------
MIT (see LICENSE.md).
