'use strict';
var fs = require('fs');

var Question = require('../models/modelQuestion.js');
var serial = require('../tools/serial.js');

// NOTE: if the set of questions in the file changes, then the questions in the survey should change. Not hardcoded, per-say, but dependent on the file.

//Construct Data structure
//file - "/fileName"
function Data (file) {
  // TODO: if file not exist, create a new file. Meantime, "/WorldModel.json" must exist.
  if (file === null || file === undefined ){
    this.file = "/WorldModel.json";
    this.data = serial.deserializeFile(this.file).data;
  }
  else {
    this.file = file;
    this.data = serial.deserializeFile(file).data;
  }
};

// push the element at the top of stack
Data.prototype.push = function (jsonObj) {
    this.data.push(jsonObj);
    var DataToJSONToFile = {"data": this.data};
    serial.serializeToFile(DataToJSONToFile, this.file);
};

//pop item from top
Data.prototype.pop = function () {
    if (this.isEmpty()) {
        return 'Stack is Empty!';
    }
    var popped = this.data.pop();

    var DataToJSONToFile = {"data": this.data};
    serial.serializeToFile(DataToJSONToFile, this.file);

    return popped;
};

// returns [] of stack reversed
Data.prototype.print = function () {
    if (this.isEmpty()) {
        return 'Stack is Empty!';
    }
    var newArr = [];
    newArr = this.data.slice(0);
    return newArr.reverse();
};

//return Top of Stack
Data.prototype.peek = function () {
    if (this.isEmpty()) {
        return 'Stack is Empty!';
    }
    return this.data[this.data.length - 1];
};

//is Empty function.
Data.prototype.isEmpty = function () {
    if (this.data.length > 0)
        return false;
    else
        return true;
};

// Survey.prototype.update = function () {};
//maybe structure has updateAllowed and update(){check updateAllowed} function to call serial's update(json, file){check this.data Vs deserialize(file), serializeToFile(json, file)} and will only update when structureSurvey's updateAllowed flag is true.
//OR just serializeToFile whenever we push or pop.
  // NOTE:
  //Novice solution: Need to create a callback with flag of operation complete and ready for next update.
    //notBusy=false b4 write, return true when done(notBusy) and in standby.
  //Better: can this be solved via, emitter?

module.exports = Data;

/*testing*/
// console.log("constructor...");
// var exec = new Data('/structWorld.json');
// console.log();
//
// console.log("data from exec.data: ");
// console.log(exec.data);
// console.log();
//
// console.log("push...");
// exec.push({"push": "1"});
// console.log("data from exec.data: ");
// console.log(exec.data);
// console.log();
//
// console.log("push...");
// exec.push({"push": "2"});
// console.log("data from exec.data: ");
// console.log(exec.data);
// console.log();
//
// console.log("push...");
// exec.push({"push": "3"});
// console.log("data from exec.data: ");
// console.log(exec.data);
// console.log();
//
//
// console.log("push...");
// exec.push({"push": "4"});
// console.log("data from exec.data: ");
// console.log(exec.data);
// console.log();
//
//
// console.log("pop...");
// exec.pop();
// console.log("data from exec.data: ");
// console.log(exec.data);
// console.log();
//
// console.log("pop...");
// exec.pop();
// console.log("data from exec.data: ");
// console.log(exec.data);
// console.log();
//
// console.log("print...");
// console.log( exec.print() );
// console.log("data from exec.data: ");
// console.log("printed.");
// console.log();
//
// console.log("peek...");
// console.log(exec.peek());
// console.log("data from exec.data: ");
// console.log(exec.data);
// console.log();
//
// console.log("isEmpty...");
// console.log(exec.isEmpty());
// console.log("data from exec.data: ");
// console.log(exec.data);
// console.log();
















/* Thoughts
//one way to share a single Data object is to export new Data();, but means file hardcoded.
//unless a startData service calls on Data, and exports that info to make miniStructures (minStructs import this specific Data instance).
//But the startData service that starts Data has to have a param and must be called by mainService.
//this mainService can access Data miniStructures' methods to manipulate specific Data instance's data.
//prob: verbose.
*/

/* SCRATCH
--Constructor--
//CHECK WHAT type of value questions is and store in questions accordingly.
// if (typeof(questions) === "string"){
//   console.log("sup");
// }
// if (typeof(questions) === "object"){
//   console.log("sup");
// }
// if (typeof(questions) === "array"){
//   console.log("sup");
// }
// For now assume sting. ex: "You lke?". can check built-in functions, but constructed objects show as Objects not constructed name.
*/


/* OLD CODE
//input example: '{"op" : "add", "number" : 5}'
Survey.prototype.calc = function (input) {
    try {
        var obj = JSON.parse(input);
        return this.engine(obj);
    } catch (error) {
        return 'Invalid JSON Passed!';
    }
};
/*
Survey.prototype.engine = function (jsonString) {
    try {
        switch (jsonString.op) {
            case "add":
                var sum = 0;
                if (jsonString.expr) {
                    let res = this.engine(jsonString.expr);
                    sum = this.peek() + res;
                } else {
                    sum = this.peek() + jsonString.number;
                }
                return sum;
            case "subtract":
                var diff = 0;
                if (jsonString.expr) {
                    let res = this.engine(jsonString.expr);
                    diff = this.peek() - res;
                } else {
                    diff = this.peek() - jsonString.number;
                }
                return diff;
            case "push":
                if (jsonString.expr) {
                    let exprRes = this.engine(jsonString.expr);
                    this.push(exprRes);
                    return exprRes;
                } else if (jsonString.number) {
                    this.push(jsonString.number);
                    return jsonString.number;
                }
                break;
            case "pop":
                var ret = this.pop();
                return ret;
                break;
            case "print":
                return this.print();
        }
    } catch (error) {
        return "Unable to perform the operation";
    }
}
/**/
