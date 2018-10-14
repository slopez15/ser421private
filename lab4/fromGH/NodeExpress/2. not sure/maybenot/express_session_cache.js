// Example from Brad Dayley
// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development

var express = require('express');
var cookieParser = require('cookie-parser');
//var session = require('cookie-session');
var session = require('express-session');
var app = express();
app.use(cookieParser());
//app.use(cookieSession({secret: 'MAGICALEXPRESSKEY'}));
app.use(session({
	secret: 'MAGICALEXPRESSKEY',
	resave: true,
	saveUninitialized: true
}));
/*
before visiting /restricted
	304 - not modified;
after visted /restricted at least once; direct call and indirect redirect.
	200 - success
seem to not show not from disk
*/
app.get('/library', function(req, res) {
  console.log(req.url);
  console.log(req.cookies);
  if(req.session.restricted) {
    if(!req.session.restrictedCount){
        req.session.restrictedCount = 1;
    } else {
        req.session.restrictedCount += 1;
    }
    res.send('You have been in the restricted section ' +
             req.session.restrictedCount + ' times. \nGo to the <a href="/library2">deep library</a> or the <a href="/library3">deepest library</a>');
  }else {
    res.send('Welcome to the library.');
  }
});
/*
200 - success
seem to not show not from disk
*/
app.get('/library2', function(req, res) {
    console.log(req.url);
    console.log(req.cookies);
    if (req.session.restricted) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate'); //no-cache, private, no-store, must-revalidate //Didn't notice changes with these all together.
				// res.set({
				// 	'Content-Type': 'text/html',
				// 	'Content-Length': response.length
				// });
        res.send('You are in the deep library, click <a href="/library">here</a> to leave.');
    }
    else {
        res.redirect('/library');
    }
});
/*
304 - not modified
seem to not show not from disk
*/
app.get('/library3', function(req, res) {
    console.log(req.url);
    console.log(req.cookies);
    if (req.session.restricted) {
        res.send('You are in the deepest library, click <a href="/library">here</a> to leave');
    }
    else {
        res.redirect('/library');
    }
});
/*
302 - found

1st try - from disk
future ties - seem to not show not from disk
*/
app.get('/restricted', function(req, res) {
    console.log(req.url);
    console.log(req.cookies);
    if (!req.session.restricted)
        req.session.restricted = true;
    else {
			/*NOTE:
				i changed the code here, but even after I changed it, the old code kept running.
				I added no-store and now the new code is running.
			*/
			// res.set('Cache-Control', 'no-store');
			req.session.destroy(function(err) { console.log("ERROR!"); }); //session destroyed when response ends.
			// req.session.restricted = false;
		}

  res.redirect('/library');
});
app.listen(8081);
