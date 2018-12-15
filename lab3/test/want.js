var express = require('express');
var url = require('url');
var app = express();
app.listen(8088);


//ROUTES
//simple routes
app.get('/', function(req, res){ res.send('Hello from Express');});
app.get('/foo', function(req, res) { res.send('bar'); });
app.post('/pink', function(req, res) { res.send('elephant'); });
app.all('/user/*', function(req,res) { res.send('Any verb for users');});
//routes
/*
/url?var=values
  query parsed url
/Pattern/paramsValues...
  req.params[]
  req.params.param
app.param('userid', callback);
/url/:pathParam/:values
  req.params.param
  req.params[]
*/



/*Middleware*/
app.get('/', function(req, res, next){
  res.send('Hello from Express');
  next();
});
app.use ('/foo', function(req, res, next) {
	console.log('First app.use call');
	next();
});
app.use (function(req, res, next) {
	console.log('2nd app.use call');
	next();
});
app.use (function(req, res, next) {
	console.log('3rd app.use call');
});
app.listen(8081);



/*redirect*/
app.get('/google', function (req, res) {
  res.redirect('http://google.com');
});
app.get('/first', function (req, res) {
  res.redirect('/second');
});
app.get('/second', function (req, res) {
  res.send("Response from Second");
});



/*json*/
app.get('/json', function (req, res) {
  app.set('json spaces', 4);
  res.json({name:"Smithsonian", built:'1846', items:'137M',
            centers: ['art', 'astrophysics', 'natural history',
                      'planetary', 'biology', 'space', 'zoo']});
});
app.get('/error', function (req, res) {
  res.status(500).json({status:false, message:"Internal Server Error"});
});
app.get('/jsonp', function (req, res) {
  app.set('jsonp callback name', 'cb');
  res.jsonp({name:"Smithsonian", built:'1846', items:'137M',
            centers: ['art', 'astrophysics', 'natural history',
                      'planetary', 'biology', 'space', 'zoo']});
});



//request attribs
app.get('/user/:userid', function (req, res) {
  console.log("URL:\t   " + req.originalUrl);
  console.log("Protocol:  " + req.protocol);
  console.log("IP:\t   " + req.ip);
  console.log("Path:\t   " + req.path);
  console.log("Host:\t   " + req.hostname);
  console.log("Method:\t   " + req.method);
  console.log("Query:\t   " + JSON.stringify(req.query));
  console.log("Fresh:\t   " + req.fresh);
  console.log("Stale:\t   " + req.stale);
  console.log("Secure:\t   " + req.secure);
  console.log("UTF8:\t   " + req.acceptsCharsets('utf8'));
  console.log("Connection: " + req.get('connection'));
  console.log("Headers: " + JSON.stringify(req.headers,null,2));
  res.send("User Request");
});


//express settings
console.log("env:" + app.get('env')); //production
console.log("trust proxy:" + app.get('trust proxy')); //false
console.log("jsonp callback name:" + app.get('jsonp callback name')); //callback
console.log("json replacer:" + app.get('json replacer')); //undefined
console.log("json spaces:" + app.get('json spaces')); //undefined
console.log("case sensitive routing:" + app.get('case sensitive routing')); //undefined
console.log("strict routing:" + app.get('strict routing')); //undefined
console.log("view cache:" + app.get('view cache')); //true
console.log("view engine:" + app.get('view engine')); //undefined
console.log("views:" + app.get('views')); //path.../views



//cache
res.set('Cache-Control', 'no-store'); //no-cache, private, no-store, must-revalidate

//session
var session = require('express-session');
app.use(session({
	secret: 'MAGICALEXPRESSKEY',
	resave: true,
	saveUninitialized: true
}));
/*
304 - not modified
*/
app.get('/library', function(req, res) {
  console.log(req.cookies);
  if(req.session.restricted) {
    res.send('You have been in the restricted section ' +
             req.session.restrictedCount + ' times.'); // NOTE: redirect in other example.
  }else {
    res.send('Welcome to the library.'); // NOTE: cache-control in other example.
  }
});
/*
302 - found
200 - success
both from disk space.
*/
app.get('/restricted', function(req, res) {
  req.session.restricted = true;
  if(!req.session.restrictedCount){
    req.session.restrictedCount = 1;
  } else {
    req.session.restrictedCount += 1; // NOTE: session destroy in other example.
    // req.session.destroy(function(err) { console.log("ERROR!"); }); //session destroyed when response ends.
  }
  res.redirect('/library');
});
app.listen(8081);






//If using cookies, better off using cookie-parser middleware.
app.use(require('cookie-parser')());
req.cookies.hasVisited;
res.cookie('hasVisited', '1',{ maxAge: 60*60*1000, httpOnly: true, path:'/'});


//setting headers via http
res.status(200);
res.set({
  'Content-Type': 'text/html',
  'Content-Length': response.length,
  'Set-Cookie': ['foo=bar2','bar=foo2']
});
var headers = {
  'Content-Type': 'text/html',
  'Set-Cookie': ['foo=bar2','bar=foo2']  //['foo=bar','bar=foo'] Notices the cookies. //{'foo':'bar','bar':'foo'} Notices it as an object.
};
res.writeHead(200, headers);



//view templates
var express = require('express'),
    pug = require('pug'),
    ejs = require('ejs');

var app = express();
app.listen(8080);
//express settings and view engine.
app.set('views', './views');
app.set('view engine', 'pug');
app.engine('pug', pug.__express);
app.engine('html', ejs.renderFile);
//local variables
app.locals.uname = "Brad";
app.locals.vehicle = "Jeep";
app.locals.terrain = "Mountains";
app.locals.climate = "Desert";
app.locals.location = "Unknown";
//render views
app.get('/pug', function (req, res) {
  res.render('user_pug');
});
app.get('/ejs', function (req, res) {
  app.render('user_ejs.html', function(err, renderedData){
    res.send(renderedData);
  });
});



//POST
var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
app.listen(8081);
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//form
app.get('/', function (req, res) {
  var response = '<form method="POST">' +
        'First: <input type="text" name="first"><br>' +
        'Last: <input type="text" name="last"><br>' +
        '<input type="submit" value="Submit"></form>';
  res.send(response);
});
//after form submitted
app.post('/',function(req, res){
  var response = '<form method="POST" action="/">' + //<<I think though browser only does GET, form allows it to post.
        'First: <input type="text" name="first"><br>' +
        'Last: <input type="text" name="last"><br>' +
        '<input type="submit" value="Submit"></form>' +
        '<h1>Hello ' + req.body.first + '</h1>';
  res.type('html');
  res.end(response);
  console.log(req.body); //{ first: 'f', last: 'g' }
});


/* Ideas
Maybe do program with string templates than convert to pug/jade.
  Then, replace ${var} to #{var}
  have app.locals so can pass props
*/
var fs = require('fs');
var ROOT_DIR = "html/";
fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
  res.end(data);
});
