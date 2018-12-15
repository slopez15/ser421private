const app = require('./routesService');
module.exports = app;


// app.get('/app', function(req, res) { res.send('app'); });









/*
It has gone thorugh a series of services before getting into this main routine (app.js) which node will run.
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
.
/ --


*/
