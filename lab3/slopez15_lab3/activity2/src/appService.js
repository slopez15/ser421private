var express = require('express'),
  //view templates
    pug = require('pug'),
    // ejs = require('ejs'),
  //3rd party middleware
    bodyParser = require('body-parser'),
    session = require('express-session');
  //add static middleware? -NO; disables app.get, etc. thus can't do certain methods when specific page visited. Sole purpose to serve static files.
    // staticMiddleware = require('express-static');
var structureData = require('./structures/structureData.js');

var app = express();
app.listen(8088);

//Data 1 store created for persistance and to be attached to express app.
var Data = new structureData();
app.locals.Data = Data; // NOTE: possible security issue. p #{Data} pug
app.locals.HTTPcodes = {
  "404": "not found; unknown URL",
  "405": "Method not allowed",
  "400": "Bad Request; resource exist, but Payload not valid",
  "401": "Unauthorized; not logged in or username not entered."
};

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	secret: 'SECRET_KEY',
	resave: true,
	saveUninitialized: true
}));
//1 store for my data passed via express-session.

// app.use( staticMiddleware(__dirname + '/views') ); //, {'index': ['root.pug'] } //index sets and index of files that can visit.


//express settings; set express settings for view folder, view engine, and engine.
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.engine('pug', pug.__express);
// app.engine('ejs', ejs.renderFile);


module.exports = app; //{app:app, Data:Data}






/*testing*/
// app.get('/', function(req, res) { res.send('bar'); });
// app.get('/a', function(req, res) { res.send('appService'); });





/*
Here we define express app, apply any 3rd party services, express settings, and export app.
It will go thorugh a series of services before getting into the main routine (app.js) which node will run.
*/
/* Design passage of app.
app (passed down)(exp-settings)(imported modules--3rd party modules for express app)
  middleware (in house modules) (app.use)
    routes (app.get, etc.)
routes pick view
view
  pug files (data)
    (req.session via express-session)
    questions, ip, answers
*/
