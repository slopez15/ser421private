// Example from Brad Dayley
// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development

// Access http://localhost:8080/hello.html
var fs = require('fs');
var http = require('http');
var url = require('url');
var qstring = require('querystring');
var Page = require('./html/Page.js');
var userInfo = {}; // TEMP:
//start server
http.createServer(function (req, res) {
  //get request's URL info.
  console.log("request:" + req.method + " path: " + url.parse(req.url, true, false).pathname);
  if (req.method == "POST"){
    //get query data.
    var reqData = "";
    req.on('data', function (chunk) {
      reqData += chunk;
    });
    //format query and route to handler (sendResponse)
    req.on('end', function() {
      var postParams = qstring.parse(reqData);
      req.postParams = postParams;
      sendResponse(req, res);
    });
  } else{
    //hacking so program doesnt break.
    req.postParams = {};
    sendResponse(req, res);
  }
}).listen(8080, 'localhost', 3, function() {
  console.log('I am now ready!');
});

//send response - I don't want to worry about getting params so, if payload provided, it will be part of req.
//send response to client.
function sendResponse(req, res){
  var urlObj = url.parse(req.url, true, false);
  // console.log(req.postParams); //username=f&password=f&role=Author
  switch( urlObj.pathname.toLowerCase() ) {
    case "/home":
      // TODO: :welcome msg; check if member user info
      displayPage("home", res);
      break;
    case "/viewnews":
      if (req.postParams.username != req.postParams.password){ //fail page
        displayPage("fail", res);
      }
      else {
        // TEMP: hardcoded user info.
        userInfo = {
          username: req.postParams.username,
          role: req.postParams.role,
        };
        //loged in user: show uname and role & logout (link to home)
        //TODO: cookies
        // const userCookie = req.getHeader('set-cookie');
        // console.log(userCookie);
        // res.setHeader('Set-Cookie', [`userID=users`, `role=ROLE`, `loggedIn=1`]);
        displayPage("viewnews", res);
      }
      break;
    case "/makestory":
      displayPage("makestory", res);
      break;
    default:
      // console.log("The page you requested does not exist.");
      // TODO: write reqsponse code and message.
      res.writeHead(400, {
        'Content-Type': 'text/html',
      });
      res.end("http code 400: bad request");
  }
}
function displayPage(pageName, res) {
  //read html file to print
  console.log("displayPage...");
  // fs.readFile(__dirname + "/html" + pageName + ".html", function (err,data) { //urlObj.pathname.toLowerCase()
  //   //activity3  html\\home.html"}
  //   if (err) {
  //     res.writeHead(404);
  //     // res.end(JSON.stringify(err));
  //     return;
  //   }
  //   res.writeHead(200, {
  //     'Content-Type': 'text/html', //      'Set-Cookie': `f=${"varName"}`
  //   });
  //   res.end(data);
  // });
  console.log(pageName);
  res.userInfo = userInfo;
  Page[`${pageName}Page`](res);
}







//Note: for l8r?
//1=public, 2=public and private, 3=public and privately author.
//Guest=1; Subscriber=2; Author=3;
/**/
