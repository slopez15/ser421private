var express = require('express'),
    pug = require('pug'),
    ejs = require('ejs'),
    app = express();
app.listen(8088);

//HTTP Headers & express settings; set express settings for view folder, view engine, and engine.
app.set('views', './views');
app.set('view engine', 'pug');
app.engine('pug', pug.__express);
app.engine('html', ejs.renderFile);

//storing variables localy.
app.locals.uname = "Brad";
app.locals.vehicle = "Jeep";
app.locals.terrain = "Mountains";
app.locals.climate = "Desert";
app.locals.location = "Unknown";

app.locals.currentValue = "test currentValue";
app.locals.stackView = "test stackView";


//ROUTES
app.get('/pug', function (req, res) {
  console.log("GET - /pug");
  res.render('user_pug');
});
app.get('/ejs', function (req, res) {
  console.log("GET - /ejs");
  app.render('user_ejs.html', function(err, renderedData){
    res.send(renderedData);
  });
});

app.get('/', function (req, res) {
  console.log("GET - /");
  res.render('root');
});

app.post('/add', function (req, res) {
  console.log("GET - /");
  console.log(req);
  //presentValue + operand
  //history = stores operation to stack
  res.render('add');
});

app.post('/subtract', function (req, res) {
  console.log("GET - /");
  //presentValue - operand
  //history = stores operation to stack
  res.render('subtract');
});


app.get('/pop', function (req, res) {
  console.log("GET - /");
  //pops top operation off the stack
    //changes present value to the previous value of calculator.
  res.render('pop');
});

app.post('/pop', function (req, res) {
  console.log("GET - /");

  res.render('pop');
});

app.get('/reset', function (req, res) {
  console.log("GET - /");
  //calc value = 0;
  //stack = []
  res.render('reset');
});

//ALL ACTIONS
//response = to each actions be a message stating: success or error + link to (/).

/*
Validation
HTTP codes
URL -
Method -
input -
/**/

/*
// history
{
  operation:null,
  operand:null,
  IP:null,
  User-agent,
}
// not a memory of results as in lab 1
/**/










//
