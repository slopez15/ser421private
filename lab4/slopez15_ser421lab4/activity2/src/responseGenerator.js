// var userData = require('./data/userData');
//data[0].dialogue.{{}} <<-- odds are eliza, evens are user inputs. if same user enters after increment by 2.
var responseGenerator = {
  "encounter": function () {
    var randomNum = getRandomInt(1,defaultData.encounter.length) - 1;//-1 for index
    return defaultData.encounter[randomNum];
  },
  "greetings": function () {
    var randomNum = getRandomInt(1,defaultData.greetings.length) - 1;//-1 for index
    return app.name + " " + defaultData.greetings[randomNum];
  },
  "entries": function (userInput) {
    //find key word in userInput. Provide answer/question by random.
    //if none just supply a message from last entry object.
    var randomNum = getRandomInt(1,defaultData.entries.length) - 1;//-1 for index
    var randomNum2 = getRandomInt(1,defaultData.entries[randomNum].question.length) - 1;
    return app.name + ". " + defaultData.entries[randomNum].question[randomNum2];
    /*
    entries
    [
      {
        "key": ["stupid","dumb","idiot","unintelligent","simple-minded","braindead","foolish","unthoughtful"],
        "answer": ["Take your attitude somewhere else.", "I don't have time to listen to insults.", "Just because I don't have a large vocabulary doesn't mean I don't have insults installed."],
        "question": ["Have you thought about how I feel?", "I know you are but what am I?"]
      }
    ]
    */
  }
};

//Functions - for responseGenerator and tools (should be seperate file, but i'll leave here as response manipulation functions).
//based on code from js web api docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min; //The maximum and minimum are inclusive
}
function capitalize(string) {
  string = string.toLowerCase();
  var words = string.split(' ');
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }
  string = words.join(' ');
  return string;
}
