/*
question - string
*/
function Question(question) {
  if (question.constructor.name === "String"){
    this.question = question;
  }
  else {
    this.question = null;
  }
}

module.exports = Question;

// var q = new Question("s");
// console.log(q.constructor.name);

/* Scratch
//req: {IP, UA, answers: {Qnum: "Ans"}, rankedList: [sorted by point value] }
//Q -> Q + U info
*/
