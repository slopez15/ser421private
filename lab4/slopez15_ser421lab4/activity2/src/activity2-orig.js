function App() {
  //Attributes
  this.name = "";
  this.runningDialogue = "";
  // this.isRunningConversation = false;

//Functions
  //print onto <div id="dialogue">
  App.prototype.displayDialogue = function () {
    var dialogue_p = document.getElementById("dialogue p");
    dialogue_p.textContent = this.runningDialogue;
  }
  //set
  App.prototype.saveConversation = function (name = this.name) {
    console.log(name);
  }
  //get -- should format json into string dialogue.
  App.prototype.restoreConversation = function (name = this.name) {
    //restore if prior respondent
    console.log(name);
  }
  //clear
  App.prototype.clearConversation = function (name = this.name) {
    console.log(name);
  }

  App.prototype.generateResponse = function (name = this.name) {
    //ask for his/her name at startup. "encounter"
    if (this.runningDialogue == ""){
      
    }
    //restoreConversation if already met user and print runningDialogue.
    //start with "greetings", then "entries"
    else {
      //
    }
  }


  //code to run when initiated.
  this.generateResponse();
  this.displayDialogue();
}
var app = new App();
