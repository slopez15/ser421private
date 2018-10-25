// Example from Brad Dayley
// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development

var express = require('express');
var url = require('url');
var app = express();
app.listen(8080);
app.get('/', function (req, res) {
  res.send("Get Index");
});
//--/find?author=auth&title=tite
app.get('/find', function(req, res){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var response = 'Finding Book: Author: ' + query.author +
                  ' Title: ' + query.title;
  console.log('\nQuery URL: ' + req.originalUrl);
  console.log(response);
  res.send(response);
});
//--/book/chap:pg
app.get(/^\/book\/(\w+)\:(\w+)?$/, function(req, res){
  var response = 'Get Book: Chapter: ' + req.params[0] +
              ' Page: ' + req.params[1];
  console.log('\nRegex URL: ' + req.originalUrl);
  console.log(response);
  res.send(response);
});
//--/user/1
app.get('/user/:userid/:sup', function (req, res) {
  var response = 'Get User: ' + req.params.userid;
  console.log('\nParam URL: ' + req.originalUrl);
  console.log(response + "\n" + req.params.sup);
  res.send(response);
});
app.param('userid', function(req, res, next, value){
  console.log("\nRequest received with userid: " + value);
  next();
});

//    /find?author=Brad&title=Node
//    /book/12:15
//    /user/4983
