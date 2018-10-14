// Example from Brad Dayley
// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development

var express = require('express');
var url = require('url');
var app = express();
app.listen(8082);
app.get('/', function (req, res) {
  var response = '<html><head><title>Simple Send</title></head>' +
                 '<body><h1>Hello from Express</h1></body></html>';
  res.status(200);
  //NOTE:sets header.
  res.set({
    'Content-Type': 'text/html',
    'Content-Length': response.length
  });
  res.send(response);
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});
app.get('/error', function (req, res) {
  res.status(400);
  res.send("This is a bad request.");
});
