Description
-----------

This is the TinderHouse Project for the Zillow Winter 2015 Hackathon.

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

GitIgnore
---------

The project is initially setup to ignore common ide files, and built JavaScript / map files. JavaScript files in the `src/common/vendor` directory are not ignored. As a general rule, post-compiled files should not be part of the source.

Development Style
-----------------

The application development style I follow is similar to many Java applications:

- Every class resides in their own TypeScript file
- Every class TypeScript file ends with an `export = ClassName;` statement to make itself available for import
- Every class that depends on another class, imports that class via `import ClassName = require('/path-to-class/ClassName');`
- Every class TypeScript file is named as `ClassName.ts`


Architecture
------------

Client:

![Image of Client](https://github.com/aaronnech/Zillow2015/raw/master/ASSET/client.png)

Server:

![Image of Server](https://github.com/aaronnech/Zillow2015/raw/master/ASSET/server.png)
