// var responseGenerator = require('./responseGenerator.js');
/* Note:
userData.json and default.json
should be either public (imported as global variables for scripts), or
local/session (stored on client)
*/
// TODO: storage, dialogue, user keywords--random response by unused, 30sec window.setTimeout for input, json, /commands,
function App() {
  //Attributes
  this.name = "";
  this.runningDialogue = ""; //json conversation/object of certain user.
  this.state = 0; //0=encounter (new or after clear), 1=greeting, 2=entries ("loops");
    //3=slash command, all events on hold?, 4 = JSON
    // 3.1? = /clear
    // 3.2  = /search
    // 3.3  = /history

  this.dialogueString = ""; //this is just to print strings.

//Functions
  //print this.runningDialogue's contents onto <div id="dialogue">
  App.prototype.displayDialogue = function () {
    if (this.state != 0){
      // TODO: convert runningDialogue into string and assign string to dialogueString. // NOTE: dialogueString at point of state in generateResponse should have already been added to runningDialogue.
        // console.log(this.runningDialogue);

        // "dialogue":{ "1":"Hi there! What's your name?", "2":"My name is james.", "4":"I like baseball", "5":"Nice to meet you James." }
        //eliza = ods, user = even.
        // for (var i = 0; i <  this.runningDialogue.length ; i++){
        //   if (this.runningDialogue[]){
        //
        //   }
        //   else {
        //
        //   }
        // }

        // NOTE: iterate thorugh key/value pairs. check key num for who spoke, then format string dialogue with value.: Eliza: value
        // change code at bottom to = dialogueString;
    }
    //overwrite particular Dom element to print dialogueString
    var dialogue_p = document.getElementById("dialogue p");
    dialogue_p.textContent = this.dialogueString;
  }
  //set conversation into userData as specific user or overwrite it.
  App.prototype.saveConversation = function (name = this.name) {
    console.log(name);
  }

  //get user specific convo, if exist.
  App.prototype.restoreConversation = function (name = this.name) {
    //restore if prior respondent
    console.log(name);
  }
  //clear -- clear user spdicific data and change state=0.
  App.prototype.clearConversation = function (name = this.name) {
    console.log(name);
  }

  //respond depending on app state.
  App.prototype.generateResponse = function (input) {
    // TODO: maybe before states, if it is slash command or json, change state then revert back to state it was in before.; this helps with differentiating assumptions and detection.
    // if (this.isSpecialState()){
    //   this.executeSpecialState();
    // }

    //after each eliza responses, save converse and displayDialogue;(the update)
    console.log("entry");
    switch (this.state) {
      case 0:  //0=encounter
          console.log("test - 0");
        //important: okay to overwrite runningDialogue as string here, but l8r MUST be object of dialogue or object prepped for dialogue. This is used to print eliza dialogue.
        //ask for his/her name at startup. "encounter"
        this.dialogueString = responseGenerator.encounter();

        // TODO: no need to save yet., but record encounter response.
        // this.saveConversation();
        this.displayDialogue();

        this.state += 1;
        break;
      case 1:  //1=greeting
        console.log("test - 1");
        // console.log(name) //name is document.getElementById('userInput').value

        this.name = capitalize(input); //save name; //capitliza the name just in case.

        //if(assume) name entered, greet user and restore conversation (if user exists).
        // if (){
        //   this.name = input; //save name
        //   this.restoreConversation(this.name);
        // }

        this.dialogueString = responseGenerator.greetings();
        // this.restoreConversation(this.name);

        // this.saveConversation();
        this.displayDialogue();

        this.state += 1;
        break;
      case 2:  //2=entries
      console.log("test - 2");
        //anything after just loop with entires eliza responses based on user responses.
        this.dialogueString = responseGenerator.entries(); // TODO: impl.

        // this.saveConversation();
        this.displayDialogue();

        //no state change should stay here unless slash command or json.
        break;
      case 3: //3 = slash command
        //
        break;
      case 4: // 4 = json
        //
        break;
      default:
        console.log("error: invalid state");
    }

    //restoreConversation if already met user and print runningDialogue.
    //start with "greetings", then "entries"
    // else {
    //   //
    // }
    console.log("exit");
    console.log("");
  }

  //code to run when initiated.
  //<<import data into correct browser storage / location.
  if ( localStorage.getItem("defaultData") ){
    localStorage.setItem("defaultData", ["defaultData", "sup"]);
    console.log( ":" + localStorage.getItem("defaultData") );
  }

  // sessionStorage.setItem("defaultData", defaultData); //session cause, will
  this.generateResponse(); //encounter
  // this.displayDialogue(); //initial dialogue history //if called here, state would have already changed.
}
var app = new App();




/*
make this a
event driven state<<
not looping state << no need to constantly run.
*/
