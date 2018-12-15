/* SER 421 Lab 3
 *
 * Reference Attributes: Kevin Gary, Brad Dayley
 *
 * EJS Views referenced from:
 * https://github.com/kgary/ser421public/blob/master/NodeExpress/templates/express_templates.js
 *
 * Body-parser referenced from:
 * https://github.com/kgary/ser421public/blob/master/NodeExpress/express_post.js
 */
var express = require('express');
var bParse = require('body-parser');
var calc = require('./calc.js');

var calc = new calc();
var app = express();
app.listen(8008);

//set app settings for
	//json
app.set('json spaces', 2); // number of spaces for indentation
	//views, ejs,
var ejs = require('ejs');
app.set('views', __dirname + '/../client/html/');
app.engine('html', ejs.renderFile);

//middleware
app.use(bParse.urlencoded({ extended: true }));
	//url related middleware.
app.use('/client', express.static(__dirname + '/../client/zAjax/'));
// app.use(express.static(__dirname + '/../client/html/')); // TODO: delete/remove this line


//app locals
app.locals.calcValue = 0;
app.locals.opStack = [];


//app should load when URL (/) of your server is accessed.
// Should provide a HTML file with included scripts.
// Scripts have Ajax calls to server API to get data, and scripts will manipulate for DOM manipulation.
// Unlike, calc base where each server route will provide a new whole html page formatted based on data. (eg. render views and view controller in server.)
// 	So, no view render should exist in server. Just provide one static html w/ scripts (see 1st sentence).

//in submission: commented wrong code!
/**/
app.get('/', function(req, res) {
	//redirect method
	res.status(307); //temp redirect; until find better way to send client html via '/' path. //303 - see other. 301 - Moved Permanently, 302 Found,
	res.redirect('/client/ajax-basics-1c.html');
});
/**/

/*
app.get('/', function(req, res) {
	app.render('main.html', function(error, data) {
		res.set({'Cache-Control': 'no-cache, no-store'});
		res.status(200);
		res.type('html');
		res.send(data);
	});
});
/**/






// Post and Get methods for pop
app.get('/pop', function(req, res) {
	if(calc.getStack().length > 0) {
		calc.pop();
		app.locals.calcValue = calc.getCurrVal();
		app.locals.opStack = calc.getStack();
		// successPage(req, res);
		res.status(200);
		res.json(`{value: ${app.locals.calcValue} }`);
		// console.log(app.locals.calcValue);
	} else {
		res.status(500);
		res.send(" {error: 'Internal server error! Error 500!'} ");
		// error500(req, res);
	}
});

app.post('/pop', function(req, res) {
	if(calc.getStack().length > 0) {
		calc.pop();
		app.locals.calcValue = calc.getCurrVal();
		app.locals.opStack = calc.getStack();
		// successPage(req, res);
		res.status(200);
		res.json(`{value: ${app.locals.calcValue} }`);
		// console.log(app.locals.calcValue);
	} else {
		res.status(500);
		res.send(" {error: 'Internal server error! Error 500!'} ");
		// error500(req, res);
	}
});

/*
 * Handle add, subtract, and reset calls
 *
 * isNaN() referenced from:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
 */
app.post('/add', function(req, res) {
	var num = parseInt(req.body.number);
	if(isNaN(num)) {
		res.status(500);
		res.send(" {error: 'Internal server error! Error 500!'} ");
		// error500(req, res);
		return;
	}
	var userAgent = req.get('User-Agent');
	var op = '+';
	var ipAddr = req.ip;
	calcOperation({operation:op, operand:num, ip:ipAddr, user:userAgent});

	res.status(200);
	res.json(`{value: ${app.locals.calcValue} }`);
	// successPage(req, res);
});

app.post('/subtract', function(req, res) {
	var num = parseInt(req.body.number);
	if(isNaN(num)) {
		res.status(500);
		res.send(" {error: 'Internal server error! Error 500!'} ");
		// error500(req, res);
		return;
	}
	var userAgent = req.get('User-Agent');
	var op = '-';
	var ipAddr = req.ip;
	calcOperation({operation:op, operand:num, ip:ipAddr, user:userAgent});

	res.status(200);
	res.json(`{value: ${app.locals.calcValue} }`);
	// successPage(req, res);
});

app.get('/reset', function(req, res) {
	app.locals.calcValue = 0;
	app.locals.opStack = [];
	calc.reset();

	res.status(200);
	res.json(`{value: ${app.locals.calcValue} }`);
	// successPage(req, res);
});

app.get('/history', function(req, res) {
	// console.log(app.locals.opStack);
	if (app.locals.opStack.length == 0){
		res.status(500);
		res.send(" {error: 'Internal server error! Error 500!'} ");
		return;
	}

	//TODO: stringify json[]
	// var opStack = app.locals.opStack;
	// var jsonString = "{stack:"
	// for (var i = 0; i < opStack.length; i++){
	// 	opStack[i]
	// }
	// jsonString += "}";
	// console.log(app.locals.opStack.toString());

	res.status(200);
	res.json(`{stack: ${app.locals.opStack.toString()} }`);
});

// 405 and 404 error handlers
app.get('/subtract', function(req, res) {
	res.status(405);
	res.send(" {error: 'Improper method! Error 405!'} ");
	// error405(req, res);
});

app.get('/add', function(req, res) {
	res.status(405);
	res.send(" {error: 'Improper method! Error 405!'} ");
	// error405(req, res);
});

app.post('/reset', function(req, res) {
	res.status(405);
	res.send(" {error: 'Improper method! Error 405!'} ");
	// error405(req, res);
});

app.all('/*', function(req, res) {
	res.status(404);
	res.send(" {error: 'The page does not exist! Error 404!'} ");
	// error404(req, res);
});

function calcOperation(dict) {
	calc.calc(dict);
	app.locals.calcValue = calc.getCurrVal();
	app.locals.opStack = calc.getStack();
}




/**/
//FUNCTIONS FOR PAGE PICKS + HTTP. <<<<replace with a single html page w/ ajax, etc...

// function successPage(req, res) {
// 	app.render('success_page.html', function(error, data) {
// 		res.set({'Cache-Control': 'no-cache, no-store'});
// 		res.status(200);
// 		res.type('html');
// 		res.send(data);
// 	});
// }

// function error500(req, res) {
// 	app.render('error_500.html', function(error, data) {
// 		res.set({'Cache-Control': 'no-cache, no-store'});
// 		res.status(500);
// 		res.type('html');
// 		res.send(data);
// 	});
// }

// function error404(req, res) {
// 	app.render('error_404.html', function(error, data) {
// 		res.set({'Cache-Control': 'no-cache, no-store'});
// 		res.status(404);
// 		res.type('html');
// 		res.send(data);
// 	});
// }

// function error405(req, res) {
// 	app.render('error_405.html', function(error, data) {
// 		res.set({'Cache-Control': 'no-cache, no-store'});
// 		res.status(405);
// 		res.type('html');
// 		res.send(data);
// 	});
// }

console.log('running...');







/*scratch
route: '/'
//redirect method works, kinda--temp solution.

//TODO: direct sendFile method
	//Error: Forbidden. probably permissions.
// res.set({'Cache-Control': 'no-cache, no-store'});
// res.status(200);
// res.type('html');
// res.sendFile(__dirname + '/../client/zAjax/ajax-basics-1c.html');


//render method
	//Error: No default engine was specified and no extension was provided. (the file extension and express's/app's engine)
// app.render('/client/ajax-basics-1c', function(error, data) {
// 	res.set({'Cache-Control': 'no-cache, no-store'});
// 	res.status(200);
// 	// res.type('html');
// 	res.send(data);
// });

// res.send("sup");
----------------------------------------------------------
//HTML File can't access js files, so I will make the js file available from server.
//method 2: works better. express static middleware (see app.use() ending docs)
//method 1: manually make available.
// app.get('/scripts/ajax-basics-1.js', function(req, res) {
// 	app.render('/scripts/ajax-basics-1.js', function(error, data) {
// 		res.set({'Cache-Control': 'no-cache, no-store'});
// 		res.status(200);
// 		// res.type('js');
// 		res.send(data);
// 	});
// });
// app.get('/scripts/customers.js', function(req, res) {
// 	app.render('/scripts/customers.js', function(error, data) {
// 		res.set({'Cache-Control': 'no-cache, no-store'});
// 		res.status(200);
// 		// res.type('js');
// 		res.send(data);
// 	});
// });

*/
