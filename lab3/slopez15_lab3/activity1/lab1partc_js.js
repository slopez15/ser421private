"use strict";

/*input = object only.*/
function PreCalc (input) {
    // console.log(input);
    this.calcStack = [];
    this.currentValue = null;
    // if (input instanceof String){ //wont work...?
    //   input = JSON.parse(input);
    // }
    if (input == null) {
      var zero =   { operand: 0, operation: null, ip: null, userAgent: null };
      this.calcStack.push(zero);
      this.currentValue = 0;
    } else {
        if (input instanceof Object) {
          this.calcStack.push(input);
          this.currentValue = this.calcStack[0].operand;
          //could add null to any values undefined.
        }
        // if (input instanceof Array ){ //would need to go through and operate on them, but will not.
        //   input.forEach( (obj) => {
        //     this.calcStack.push(obj);
        //   });
        //   this.currentValue = this.calcStack[0].operand;
        // }
    }
};

// push the element/object at the top of stack
PreCalc.prototype.push = function (item) {
    this.calcStack.push(item)
};

//pop item from top
PreCalc.prototype.pop = function () {
    if (this.isEmpty()) {
        return 'Stack is Empty!';
    }
    return this.calcStack.pop();
};

// print stack; true if for web.
PreCalc.prototype.print = function () {
    if (this.isEmpty()) {
        return 'Stack is Empty!';
    }

    var newArr = this.calcStack.reverse();
    var StackString = '';
    for (var i = 0; i < newArr.length; i++){
      // if (web){
      //   StackString += JSON.stringify(newArr[i]) + "<br/>";
      // }
      StackString += JSON.stringify(newArr[i]) + "\n";
    }
    return StackString;
};

//return Top of Stack
PreCalc.prototype.peek = function () {
    if (this.isEmpty()) {
        return 'Stack is Empty!';
    }
    return this.calcStack[this.calcStack.length - 1];
};

//is Empty function.
PreCalc.prototype.isEmpty = function () {
    if (this.calcStack.length > 0)
        return false;
    else
        return true;
};

//input example: '{"operation" : "add", "operand" : 5}' old:'{"op" : "add", "number" : 5}'
PreCalc.prototype.calc = function (input) {
    try {
      // console.log(typeof( input ));
      if (typeof(input) == "string"){
        var obj = JSON.parse(input); // NOTE: possible lib error: should have went into catch, but just stops here is object passed.
        return this.engine(obj);
      }
      else {
        return this.engine(input);
      }
    } catch (error) {
        return 'Invalid JSON Passed!';
    }
};

PreCalc.prototype.engine = function (obj) {
    try {
        switch (obj.operation) {
            case "add":
                this.currentValue += obj.operand;
                console.log();
                this.calcStack.push(obj);
                return this.currentValue;
            case "subtract":
                this.currentValue -= obj.operand;
                this.calcStack.push(obj);
                return this.currentValue;
            case "push":
                this.push(obj.operand);
                return obj.operand;
                break;
            case "pop":
                return this.pop(); //if needed, return value and pop before hand.
                break;
            case "print":
                return this.print();
            //didn't add reset. is done in endpoint.
        }
    } catch (error) {
        return "Unable to perform the operation";
    }
}


/*
PreCalc(input)
.push(item);
.pop();
.print();
.peek();
.isEmpty();
.calc(input); //JSON.parse
.engine(jsonString);
  //switch case operations.
  //if nested calls engine again,
  //if only taking top value (peek), returns value after operating on it.
  //pushes numbers and returns expressions or the number.
*/

module.exports = PreCalc;

/*
var exec = new PreCalc(); //objects work fine, string do not.

// How math in this calculator works.
// 1. '{"operation" : "add", "operand" : 5}' returns 5 (assumes a starting init value of 0)
// 2. '{"operation" : "subtract", "operand" : 2}' returns 3 (5-2)
// 3. '{"operation" : "add", "operand" : 19}' returns 22 (19+3)

exec.calc('{"operation" : "add", "operand" : 5}');
exec.calc('{"operation" : "subtract", "operand" : 2}');
exec.calc('{"operation" : "add", "operand" : 19}');
exec.calc('{"operation" : "pop", "operand" : 5}');

console.log(exec.calcStack);
console.log(exec.currentValue);
*/
