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
var ejs = require('ejs');
var calc = require('./calc.js');

var calc = new calc();
var app = express();
app.set('views', 'html');
app.engine('html', ejs.renderFile);
app.use(bParse.urlencoded({ extended: true }));

app.locals.calcValue = 0;
app.locals.opStack = [];

app.listen(8008);

app.get('/', function(req, res) {
	app.render('main.html', function(error, data) {
		res.set({'Cache-Control': 'no-cache, no-store'});
		res.status(200);
		res.type('html');
		res.send(data);
	});
});


// Post and Get methods for pop
app.get('/pop', function(req, res) {
	if(calc.getStack().length > 0) {
		calc.pop();
		app.locals.calcValue = calc.getCurrVal();
		app.locals.opStack = calc.getStack();
		successPage(req, res);
	} else {
		error500(req, res);
	}
});

app.post('/pop', function(req, res) {
	if(calc.getStack().length > 0) {
		calc.pop();
		app.locals.calcValue = calc.getCurrVal();
		app.locals.opStack = calc.getStack();
		successPage(req, res);
	} else {
		error500(req, res);
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
		error500(req, res);
		return;
	}
	var userAgent = req.get('User-Agent');
	var op = '+';
	var ipAddr = req.ip;
	calcOperation({operation:op, operand:num, ip:ipAddr, user:userAgent});
	successPage(req, res);
});

app.post('/subtract', function(req, res) {
	var num = parseInt(req.body.number);
	if(isNaN(num)) {
		error500(req, res);
		return;
	}
	var userAgent = req.get('User-Agent');
	var op = '-';
	var ipAddr = req.ip;
	calcOperation({operation:op, operand:num, ip:ipAddr, user:userAgent});
	successPage(req, res);
});

app.get('/reset', function(req, res) {
	app.locals.calcValue = 0;
	app.locals.opStack = [];
	calc.reset();
	successPage(req, res);
});

// 405 and 404 error handlers
app.get('/subtract', function(req, res) {
	error405(req, res);
});

app.get('/add', function(req, res) {
	error405(req, res);
});

app.post('/reset', function(req, res) {
	error405(req, res);
});

app.all('/*', function(req, res) {
	error404(req, res);
});

function calcOperation(dict) {
	calc.calc(dict);
	app.locals.calcValue = calc.getCurrVal();
	app.locals.opStack = calc.getStack();
}

function successPage(req, res) {
	app.render('success_page.html', function(error, data) {
		res.set({'Cache-Control': 'no-cache, no-store'});
		res.status(200);
		res.type('html');
		res.send(data);
	});
}

function error500(req, res) {
	app.render('error_500.html', function(error, data) {
		res.set({'Cache-Control': 'no-cache, no-store'});
		res.status(500);
		res.type('html');
		res.send(data);
	});
}

function error404(req, res) {
	app.render('error_404.html', function(error, data) {
		res.set({'Cache-Control': 'no-cache, no-store'});
		res.status(404);
		res.type('html');
		res.send(data);
	});
}

function error405(req, res) {
	app.render('error_405.html', function(error, data) {
		res.set({'Cache-Control': 'no-cache, no-store'});
		res.status(405);
		res.type('html');
		res.send(data);
	});
}

console.log('running...');
