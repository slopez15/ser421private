//import all routes here.
const app = require('./middlewareService');
module.exports = app;

// NOTE: res.render(view, [locals], callback)); app.locals or req.session ~2bpassed

//err
// app.all('/err', function (req, res) {
//   res.render('http.pug');
// });


//user enters her/his name on the site’s landing page (/).
app.get('/', function (req, res) {
  app.locals.completedSurvey = false;
  res.render('root.pug');
});

// user then takes survey about their 421 preferences.
  //60 sec; secs left on page;
    //*R1*terminates if user not completed on time.
app.get('/survey/:qNum', function (req, res) {
  // console.log(req.params); //{ qNum: '1' }
  // console.log(req.body); //{ username: 'sdf' }
  // console.log(req.session); //Session { cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true } }

  //IF time out, redirect to lastPage
  if (app.locals.timeout == true){
    res.redirect("/lastPage");
  }
  else {
    var locals = {};
    locals.qAmount = app.locals.Data.data.length;
    locals.question = app.locals.Data.data[req.params.qNum-1].question; //page starts with 1 and array starts at 0.
    locals.possibleAnswers = app.locals.Data.data[req.params.qNum-1].possibleAnswers;

    locals.qNum = parseInt(req.params.qNum);
    locals.preference = app.locals.preference;

    res.render('question.pug', locals);
  }

});



// user then takes survey about their 421 preferences.
//60 sec; secs left on page;
//*R1*terminates if user not completed on time.
app.post('/survey/:qNum', function (req, res) {
  // console.log(req.params); //{ qNum: '1' }
  // console.log(req.body); //{ username: 'sdf' }
  // console.log(req.session); //Session { cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true } }

  //IF time out, redirect to lastPage
  if (app.locals.timeout == true){
    res.redirect("/lastPage");
  }
  else {
    var locals = {};
    locals.qAmount = app.locals.Data.data.length;
    locals.question = app.locals.Data.data[req.params.qNum-1].question; //page starts with 1 and array starts at 0.
    locals.possibleAnswers = app.locals.Data.data[req.params.qNum-1].possibleAnswers;

    locals.qNum = parseInt(req.params.qNum);
    locals.preference = app.locals.preference;

    res.render('question.pug', locals);
  }

});

//form to decide view preference.
app.get('/preference', function (req, res) {
  res.render('preference');
});




// *R2* show user not finished survey on time. OR redirect to '/'
app.post('/lastPage', function (req, res) {
  // if (app.locals.completedSurvey == false && app.locals.completedSurvey != undefined){
  //   res.redirect('/');
  // }
  // else {
    res.render('lastPage');
  // }
});

// Conclusion of survey; ranked list of users; most compatible by answers.
app.post('/match', function (req, res) {
  res.render('match');
});


// NOTE: NOT SURE IF NEEDED: push, pop Qs

/*testing*/
// app.get('/', function(req, res) { res.send('bar'); });
// app.get('/r', function(req, res) { res.send('routesService'); });









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
Here we gather all routines services, apply to app, and export app.
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
/* endpoint design see notes.js
/survey/:QNum
  keeps static version list of Qs, separate from runtime/persistent list of Qs.
*/
