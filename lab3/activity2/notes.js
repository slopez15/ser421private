'/'
user enters her/his name on the site’s landing page (/).
'/survey/:QNum'
user then takes survey about their 421 preferences.
60 sec
  maybe break Qs into their own page.
  secs left on page.s
  *R1*terminates if user not completed time.
'/incomplete'
  show user not finished survey on time.
  or redirect to '/'
'/complete'
Conclusion of survey,
  ranked list of users
    most compatible by answers.
  *R2*redirect/<a> to home '/'
'model'
  create model.
  match route to method.
    code that delegates model.
  *R3*model exc logic into World model.
    //
    model:
      *C4*('fs') write Qs
'middleware'
  *R5*res.set('Cache-Control', 'no-store');
  //res.redirect(308, '/' + req.body.operation);
  *C3*var session = require('express-session');
    a. Carrying survey questions forward through the survey (6 pts)
      *have a set of Qs persist with session regardless of changes to world model of Qs
    b. Properly handling the “Prev” button (6 pts)
      just take them to form.
    c. Pre-populating survey responses from any browser when re-logging in (8 pts)
      based on IP.
'validation'
  *R4*URL, method, payload; answers
    error/success + http codes
'pages'
  locals
    timeLeft, endpoint, Qs, error/success + http code,
    *C4* if IP already exist, get their info for them to pre-populate form.
    if submitted: As included.
//
*Plans::
  req: {IP, UA, answers: {Qnum: "Ans"}, rankedList: [sorted by point value] }
    post: If IP in DB, update Q/A in page.
  res: page, timeLeft,
Users may return later and change their answers and receive a new ranked list of partners.
  person just resubmits survey
//
How i think will look like:
'/' routes calls logic for model, model, logic for model, model exec logic into world,
view finder dictates view by info {route, timeLeft, }, accesses model, write.

model, runtime strucutre w/ serialized model, serilize tools if needed.
endpoints w/---,
  structure calls
  validation
//
------------------------------
Example Replicate: http://swent1linux.asu.edu:8082/simplemvcex

Requirements:
R1. Implement a one-shot timer that terminates the survey immediately if the user has not completed it in 60 seconds.
R2. The last page currently redirects back to the homepage, you can merely provide a link back to it.
R3. Once you match your route and method in Express, put the code you delegate to (think Step 3 of the template pattern we have talked about) into files separate from the main routine.
    The main routine file should be app.js, and you should provide a
    package.json specifying
      external dependencies with
      targets to install and run your application
  1. HTTP request made to Router/Controller
  2. Controller (routes or delegates) to the Model
  **3. The Model executes the business logic on the world model (non-volatile state, typically a datasource)
  4. The Controller identifies the appropriate View template
  5. The View (read-only) accesses the Model to get the dynamic output
  6. The View produces the final rendered response to the client browser.
R4. Be sure to implement error handling appropriate to your application (as in Activity 1 R6 above).
  URL, method, payload
R5. You should ensure that pages are not cached. Each request to the server should be “new”.
  res.set('Cache-Control', 'no-store');

Constraints:
C1. Use Express routes to map the “handlers” delegation logic to URLs. You decide the endpoints and appropriate methods to respond to.
  Endpoint documentation design in your readme.txt.
C2. Use Pug or EJS templates to render each page of the application. (-5 if you hardcode HTML in your JS)
C3. You must use session middleware to accomplish the conversational state features of this app.
  Do not use cookies, hidden form fields, or URL rewriting for conversational state.
  **
  var session = require('express-session');
  app.use(session({
  	secret: 'MAGICALEXPRESSKEY',
  	resave: true,
  	saveUninitialized: true
  }));
  req.session.restricted = true;
  req.session.destroy(function(err) { console.log("ERROR!"); });
C4. Use the ‘fs’ module to read survey questions and write individual user responses.
  Past user responses (if available) should be pre-populated on the web forms, even if the user logs in via a second browser.
  You design the file formats used to manage survey questions and individual responses.
  NOTE: The number of questions in the survey should be variable – do NOT hardcode the set of questions based on this example!
  They should go in a file with a well-defined format (text, xml, json, whatever),
  and if the set of questions in the file changes, then the questions in the survey should change.
C5. No Javascript or CSS in the browser. (automatic -5 and 0 for any requirement above affected)

Rubric
7. Proper conversational state management of the survey using Express middleware
  a. Carrying survey questions forward through the survey (6 pts)
  b. Properly handling the “Prev” button (6 pts)
  c. Pre-populating survey responses from any browser when re-logging in (8 pts)


public class XXXServlet extends HttpServlet{
public void doGet(HttpServletRequestrq, HttpServletResponsers) throws ServletException, IOException // or doPost
{
  1. <process request headers>
  2. <process request parameters>
  3. <perform processing>
  4. <Assemble the response payload>
  5. <set Content-type and other response headers>
  6. <write out results>
}
…
}


=========================================================
Comming back to improve
=========================================================
+mongodb
+mysql
+?dao pattern like to support mongodb,mysql,fs?





















/**/
