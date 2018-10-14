// Example from Brad Dayley
// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.get('/', function(req, res) {
  console.log(req.cookies);
  /*
  setting cookies w/cookie-parser middleware.
  */
  if (!req.cookies.hasVisited){
    res.cookie('hasVisited', '1',
               { maxAge: 60*60*1000,
                 httpOnly: true,
                 path:'/'});
  }
  /*
  res.set({
  	'Content-Type': 'text/html',
  	'Content-Length': response.length,
    'Set-Cookie': ['foo=bar2','bar=foo2']
  });
  */

  /*
  //setting cookies via headers. http, (set-cookies) header.
  //**this one keeps writing everytime request. Cookies Middleware only writes if not have it up-to-date.**
  var headers = {
  	'Content-Type': 'text/html',
    'Set-Cookie': ['foo=bar2','bar=foo2']  //['foo=bar','bar=foo'] Notices the cookies. //{'foo':'bar','bar':'foo'} Notices it as an object.
  };
  res.writeHead(200, headers);
  */
  res.send("Sending Cookie");
});
app.listen(8081);
