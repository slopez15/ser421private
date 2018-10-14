// Example from Brad Dayley
// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development
var express = require('express'),
    pug = require('pug'),
    ejs = require('ejs');
var app = express();
/*
 NOTE: sets headers, but is also express settings.
I think is headers so user knows how to interpret template.
OR
so we know what user wants interpreted.
*/
app.set('views', './views');
app.set('view engine', 'pug');
app.engine('pug', pug.__express);
app.engine('html', ejs.renderFile);
app.listen(8080);
app.locals.uname = "Brad";
app.locals.vehicle = "Jeep";
app.locals.terrain = "Mountains";
app.locals.climate = "Desert";
app.locals.location = "Unknown";
app.get('/pug', function (req, res) {
  res.render('user_pug');
});
app.get('/ejs', function (req, res) {
  app.render('user_ejs.html', function(err, renderedData){
    res.send(renderedData);
  });
});
