// Example from Brad Dayley
// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development
var express = require('express');
var app = express();
app.listen(8080);

console.log("env:" + app.get('env'));
console.log("trust proxy:" + app.get('trust proxy'));
console.log("jsonp callback name:" + app.get('jsonp callback name'));
console.log("json replacer:" + app.get('json replacer'));
console.log("json spaces:" + app.get('json spaces'));
console.log("case sensitive routing:" + app.get('case sensitive routing'));
console.log("strict routing:" + app.get('strict routing'));
console.log("view cache:" + app.get('view cache'));
console.log("view engine:" + app.get('view engine'));
console.log("views:" + app.get('views'));
