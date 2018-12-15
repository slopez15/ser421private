//import all middleware here.
const app = require('./appService');
module.exports = app;


// NOTE: anyone can access '/'. below only once username entered.
//userData: username, preference, {question, answer} // TODO: question must be exact, qid not supported yet.
app.locals.validPathsMethods = [
  {path: '/',             methods: ['get'] },
  {path: '/preference',   methods: ['get'] },
  {path: '/survey/:qNum', methods: ['get', 'post'] },
  {path: '/lastPage',     methods: ['post'] },
  {path: '/match',        methods: ['post'] },
];
app.locals.preference = "vertical";
app.locals.completedSurvey = false;
// app.locals.timeStart;
// app.locals.timePassed;
// app.locals.timeStart = new Date();
// app.locals.timePassed = new Date() - app.locals.timeStart;


/**/
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store'); //based on resource paper from kgary, no-store is all you need. Otherwise follow flow diagram at: see Defining optimal Cache-Control policy: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
  // console.log(req.params); // NOTE: maybe not exist? unless specify 1st param--route.
  console.log(req.body); // {input(name=attrib): submittedValue}
  // console.log(req.session); // Session { cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true } }
  //^varies
  if (req.body.preference){
    app.locals.preference = req.body.preference;
  }
  //// TODO: TIME
  // console.log(app.locals.timeStart);
  // if (app.locals.timeStart > 0){
  //   app.locals.completedSurvey = true;
  // }

  // validateURL(req);
  // validateMethod(req);
  // validatePayload(req);

  //init idea didn't work
  // var validX = {};
  // var validX.validURL = validateURL(req);
  // validX.validMethod = validateMethod(req);
  // validX.validPayload = validatePayload(req);
  //other paths won't exec their code unless all of validX's vals are true. can just assume false here, but placed this if anyways.
  // validX = {validURL: true, validMethod: true, validPayload: true}
  // app.locals.validX = validX;
  // if (app.locals.validX.validURL == false || app.locals.validX.validMethod == false || app.locals.validX.validPayload == false){
  //   console.log("validX, 1 is false");
  // }


  // appendData(req);

  next();
});

// NOTE: after middleware, routes execute. HOWEVER, the insides of routes do not if not meet criteria.
//below code is for when route criteria not met.
/*
// code can't use.
app.use('/survey/:qNum', (req, res, next) => {
  var locals = {};
  locals.httpCode = {code: "404", msg: "not found"};
  console.log(req.params); //exists
  console.log(app.locals.Data.data.length);
  if (req.params.qNum > app.locals.Data.data.length || req.params.qNum < 0){
    console.log("sup");
    req.params.qNum = 3;//its a hack so code doesn't crash.
    res.status(locals.httpCode.code);
    res.render('http.pug', locals);
  }
  next();
});
/**/

/*
app.use((req, res, next) => {
  //
  next();
});
/**/

// function validateURL(req){
//
// }

// function validateMethod(req){}
// function validatePayload(req){}
// function appendData(req){}




/* delete Scratch
'middleware'
  *R5*res.set('Cache-Control', 'no-store');
  //res.redirect(308, '/' + req.body.operation);
  *C3*var session = require('express-session');
    a. Carrying survey questions forward through the survey (6 pts)
      *have a set of Qs persist with session regardless of changes to world model of Qs
    b. Properly handling the “Prev” button (6 pts)
      just take them to form.
    c. Pre-populating survey responses from any browser when re-logging in (8 pts)
      based on IP.
'validation'
  *R4*URL, method, payload; answers
    error/success + http codes
'pages'
  locals
    timeLeft, endpoint, Qs, error/success + http code,
    *C4* if IP already exist, get their info for them to pre-populate form.
    if submitted: As included.
.
*Plans::
  req: {IP, UA, answers: {Qnum: "Ans"}, rankedList: [sorted by point value] }
    post: If IP in DB, update Q/A in page.
  res: page, timeLeft,
Users may return later and change their answers and receive a new ranked list of partners.
  person just resubmits survey
.
// add view preference

*/




/*testing*/
// app.get('/', function(req, res) { res.send('bar'); });
// app.get('/m', function(req, res) { res.send('middlewareService'); });



/*
//code
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
/*
//cache
res.set('Cache-Control', 'no-store'); //no-cache, private, no-store, must-revalidate

//session
var session = require('express-session');
app.use(session({
	secret: 'MAGICALEXPRESSKEY',
	resave: true,
	saveUninitialized: true
}));
// 304 - not modified
app.get('/library', function(req, res) {
  console.log(req.cookies);
  if(req.session.restricted) {
    res.send('You have been in the restricted section ' +
             req.session.restrictedCount + ' times.'); // NOTE: redirect in other example.
  }else {
    res.send('Welcome to the library.'); // NOTE: cache-control in other example.
  }
});
// 302 - found
// 200 - success
// both from disk space.
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

/**/




/*
Here we gather all personal middleware services, apply to app, and export app.
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

/* Middleware Notes
Might want
http set headers
  res.set('Cache-Control', 'no-store');

Validation of URL, Method, input; HTTP CODES
  in sperate functions.
  404 not found; like unknown URL; (URL)
  405 method not allowed (METHOD)
  400 Bad Request; resource exist, but payload not valid (MALFORMED)

  401 Unauthorized; not logged in.
  403 Forbidden; user known, but Forbidden access
  423 locked; maybe locked existing service.
  410 Gone; existed, but gone.
  406 Not Acceptable; content negotiation.
  408 Request Timeout; server timed out waiting for req.
  409 Conflict; like updates.

manipulate imported payload.
  type
  add info.
    user, browser, etc.

store in req.session / req.body (some kind of var store)

redirect
    res.redirect(308, '/' + req.body.operation); //redirect post according to operation.

*/
