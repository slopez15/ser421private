/*
NOTE: this is made to test code if live server is needed.
  Specifically ajax is usefull for this.
*/
var liveServer = require("live-server");

var params = {
  host: "localhost",
  port: 8000,
  // root: "ajax/",
  // root: "ajax/1.not want/",

  // root: "ajax/1.not want/1/",
  // root: "ajax/1.not want/2/",
  // root: "ajax/1.not want/3/",
  root: "ajax/1.not want/4/",

  // file: "show-message.html",
};
liveServer.start(params);

/*
--port=NUMBER - select port to use, default: PORT env var or 8080
--host=ADDRESS - select host address to bind to, default: IP env var or 0.0.0.0 ("any address")
--no-browser - suppress automatic web browser launching
--browser=BROWSER - specify browser to use instead of system default
--quiet | -q - suppress logging
--verbose | -V - more logging (logs all requests, shows all listening IPv4 interfaces, etc.)
    // logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
--open=PATH - launch browser to PATH instead of server root
--watch=PATH - comma-separated string of paths to exclusively watch for changes (default: watch everything)
--ignore=PATH - comma-separated string of paths to ignore (anymatch-compatible definition)
--ignorePattern=RGXP - Regular expression of files to ignore (ie .*\.jade) (DEPRECATED in favor of --ignore)
--middleware=PATH - path to .js file exporting a middleware function to add; can be a name without path nor extension to reference bundled middlewares in middleware folder
    // middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
--entry-file=PATH - serve this file (server root relative) in place of missing files (useful for single page apps)
    file in js params
--mount=ROUTE:PATH - serve the paths contents under the defined route (multiple definitions possible)
    // mount: [['/components', './node_modules']], // Mount a directory to a route.
--spa - translate requests from /abc to /#/abc (handy for Single Page Apps)
--wait=MILLISECONDS - (default 100ms) wait for all changes, before reloading
--htpasswd=PATH - Enables http-auth expecting htpasswd file located at PATH
--cors - Enables CORS for any origin (reflects request origin, requests with credentials are supported)
--https=PATH - PATH to a HTTPS configuration module
--proxy=ROUTE:URL - proxy all requests for ROUTE to URL
--help | -h - display terse usage hint and exit
--version | -v - display version and exit
*/
