/*
// TODO:Convert into string template and proceed.
have app.locals so can pass props
than convert to pug/jade.
  Then, replace ${var} to #{var}
*/
var url = require('url');
var express = require('express'),
    pug = require('pug'),
    ejs = require('ejs'),
    bodyParser = require('body-parser');
    app = express();
var PreCalc = require("./lab1partc_js");
PreCalc = new PreCalc();
app.listen(8088);

//local variable
app.locals.invalid = "";
app.locals.currentValue = PreCalc.currentValue;
app.locals.stackView = PreCalc.print();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//HTTP Headers & express settings; set express settings for view folder, view engine, and engine.
app.set('views', './views');
app.set('view engine', 'pug');
app.engine('pug', pug.__express);
app.engine('html', ejs.renderFile);

app.use((req, res, next) => {
  //ensure pages no cached
  res.set('Cache-Control', 'no-store');
  //Validation of URL, Method, input; HTTP CODES
  var urlPathname = url.parse(req.url, true).pathname.toLowerCase(); //for URL
  var method = req.method.toLowerCase(); //for http method
  if (req.body.operand){
    req.body.operand = parseInt(req.body.operand);
  }
  var input = req.body; //for input/payload
  console.log("\n" + req.method + " - " + urlPathname);
  console.log("input: " + JSON.stringify(input));
  var pathExists;
  var methodExists;
  var validInput;
  /*
  Validation
  HTTP codes
  URL -
  Method -
  input -
  */


  //check if path exits.
  var currentPathNames = ["/", "/redirect", "/add", "/subtract", "/pop", "/reset"]; //totally hardcoded and really tightly coupled.
  pathExists = false;
  for(var i = 0; i < currentPathNames.length; i++){
    pathExists = pathExists || ( urlPathname == currentPathNames[i] );
    if (pathExists == true){
      break;
    }
  }
  if (pathExists == false){
    res.end("path http code");
    // res.status(400);
    // res.set('Cache-Control', 'no-store');
  }

  //check if method exists;
  methodExists = false;
  if (pathExists == true){ //if false, leave methodExists as false.
    if ( (urlPathname == "/" || urlPathname == "/pop" || urlPathname == "/reset") && method == "get"){ //cheap coupled way. knowing all are posts except, pop has get too and root has get.
      methodExists = true;
    }
    else if (method.toLowerCase() == "post" && !(urlPathname == "/" || urlPathname == "/reset") ) {
      methodExists = true;
    }
  }
  if (methodExists == false){
    res.end("method http code");
    // res.status(400);
    // res.set('Cache-Control', 'no-store');
  }

  //check if input/payload is valid; only needed for posts.
  // validInput = undefined; //Don't care about payload if pathExists or methodExists is false.
  if (pathExists == true && methodExists == true && method == "post"){ //know is a valid path, but need to know is valid post path.
    // { operand: null, operation: null, ip: null, userAgent: null }
    //validating operation.
    if (input.operation == "add" || input.operation == "subtract" || input.operation == "pop"){
      //validating operand.
      if (typeof(input.operand) == "number" || input.operation == "pop"){
        validInput = true;
        app.locals.validInput = true;
      }
    }
    //ignore IP and userAgent; they're obtained via request variable.
  }
  if (validInput !== true){
    app.locals.validInput = false; // NOTE: // TODO:
    console.log("go fix payload");
    res.status(400);
    // res.set('Cache-Control', 'no-store');
  }


  //results
  if (true){
    var str = "HTTP: " +
      "\nvald path: " + pathExists +
      "\nvald method: " + methodExists +
      "\nvald input: " + validInput;
    console.log(str);
    // res.end("str"); //works for invalid pathnames Maybe invalid methods?
  }
  next();
});
app.use ('/*', function(req, res, next) {
  // before example: req.body ~if submitted~ { operand: '45', operation: 'add' }
  if (req.body.operand){
    req.body.operand = parseInt(req.body.operand);
  }
  req.body.ip = req.ip;
  req.body.userAgent = req.headers["user-agent"];

  /* after example: { operand: 45, operation: 'add', ip: '::1', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.168 Safari/537.36'} */
  // console.log(req.body);
  next();
});

//ROUTES
app.get('/', function (req, res) {
  console.log("JJ: " + app.locals.currentValue);
  console.log("JJ: " + app.locals.calcStack);
  res.render('root');
});

app.post('/redirect', function (req, res) {
  res.redirect(308, '/' + req.body.operation); //redirect post according to operation.
});


app.post('/add', function (req, res) {
  // if (app.locals.invalid === true){
  //   PreCalc.calc(req.body);
  // }
  // else {
  //   app.locals.invalid = "Nevermind! INVALID PAYLOAD.";
  // }

  //history = stores operation to stack
  //presentValue + operand
  //storing variables localy.
  app.locals.currentValue = PreCalc.currentValue;
  app.locals.stackView = PreCalc.print();

  console.log(app.locals.validInput);
  if (app.locals.validInput === false){
    console.log("this:");
    res.status(400);
    res.end('HTTP 400 - Bad Request\ninvalid payload');
  }
  else {
    console.log("that:");
    res.render('add');
  }
});

app.post('/subtract', function (req, res) {
  //history = stores operation to stack
  //presentValue + operand
  PreCalc.calc(req.body);
  //storing variables localy.
  app.locals.currentValue = PreCalc.currentValue;
  app.locals.stackView = PreCalc.print();

  if (app.locals.validInput === false){
    res.status(400);
    res.end('HTTP 400 - Bad Request\ninvalid payload');
  }
  else {
    res.render('subtract');
  }
});


app.get('/pop', function (req, res) {
  //history = stores operation to stack
  //presentValue + operand
  PreCalc.calc(req.body);
  //storing variables localy.
  app.locals.currentValue = PreCalc.currentValue;
  app.locals.stackView = PreCalc.print();

  app.locals.popMethod = "GET";
  res.render('pop');
});

app.post('/pop', function (req, res) {
  //history = stores operation to stack
  //presentValue + operand
  PreCalc.calc(req.body);
  //storing variables localy.
  app.locals.currentValue = PreCalc.currentValue;
  app.locals.stackView = PreCalc.print();

  app.locals.popMethod = "POST";
  console.log("4: " + app.locals.validInput);
  if (app.locals.validInput === false){
    res.status(400);
    res.end('HTTP 400 - Bad Request\ninvalid payload');
  }
  else {
    res.render('pop');
  }
});

app.get('/reset', function (req, res) {
  //calc value = 0 & stack = []
  PreCalc.currentValue = 0;
  PreCalc.calcStack = [];
  //storing variables localy.
  app.locals.currentValue = PreCalc.currentValue;
  app.locals.stackView = PreCalc.print();
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
