/*
   Name: Saul Lopez
   asurite: slopez15
   class: 421
   date: 9/4/2018
*/
function PreCalc(aNumber) {
    this.calcStack = [aNumber];
    this.value = 0;
};
PreCalc.prototype.calc = function(string) {
    var value = this.calcStack[0];
    var calcStack = this.calcStack;

    //convert string to JSON
    let operation = JSON.parse(string);
    //if expression nested, do the following, else do something else for single op strings.

    //MULTI-EXPRESSION //The stack IS altered.
    if (operation.expr) {
        //get into deepest expression, then work way to outter expression. record inner most expression's number and ops on the way.
        let opArr = [];
        opArr.push(operation.op);
        let lastKnownExpr = operation;
        let checkExpr = operation.expr;
        while (checkExpr) { //if operation has expr, record last Known Expr and assign checkExpr to its expr. then check if has something.
            lastKnownExpr = checkExpr;
            opArr.push(lastKnownExpr.op);
            checkExpr = checkExpr.expr;
        } //checkExpr should be nothing and lastKnownExpr has last Known Expr;
        //Now evaluate. 1st op utilitize inner most expression's number. leading ops utilitizes the result from previous evaluation.
        let currentOp;
        currentOp = opArr.pop();
        value = calcStack[0];
        switch (currentOp) {
            case "add":
                value = value + lastKnownExpr.number;
                break;
            case "subtract":
                value = value - lastKnownExpr.number;
                break;
            case "multiply":
                value = value * lastKnownExpr.number;
                break;
            case "divide":
                value = value / lastKnownExpr.number;
                break;
            case "push":
                this.push(value);
                break;
            case "pop":
                value = this.pop();
                if (value === undefined) {
                    return "(what? You have an empty stack now)\n";
                }
                break;
            case "print":
                return this.print();
                break;
            default:
                console.log("please enter a valid operation in your inner most expression. ex:\'{\"op\" : \"add\", \"number\" : 5}\' ");
        }
        while (opArr.length > 0) { //at this point there should be at least 1 operation left.
            currentOp = opArr.pop();
            switch (currentOp) {
                case "add":
                    value += this.calcStack[0];
                    break;
                case "subtract":
                    value = this.calcStack[0] - value;
                    break;
                case "multiply":
                    value *= this.calcStack[0];
                    break;
                case "divide":
                    value /= this.calcStack[0];
                    break;
                case "push":
                    this.push(value);
                    break;
                case "pop":
                    value = this.pop();
                    if (value === undefined) {
                        return "(what? You have an empty stack now)\n";
                    }
                    break;
                case "print":
                    return this.print();
                    break;
                default:
                    console.log("please enter a valid operation in your expression. ex:\'{\"op\" : \"add\", \"number\" : 5}\' ")
            }
        }
    }

    //SINGLE EXPRESSION. //The stack remains un-altered, unless specified by push or pop.
    else {
        switch (operation.op) {
            case "add":
                value = value + operation.number;
                break;
            case "subtract":
                value = value - operation.number;
                break;
            case "multiply":
                value = value * operation.number;
                break;
            case "divide":
                value = value / operation.number;
                break;
            case "push":
                value = operation.number;
                this.push(value);
                break;
            case "pop":
                value = this.pop();
                if (value === undefined) {
                    return "(what? You have an empty stack now)\n";
                }
                break;
            case "print":
                return this.print();
                break;
            default:
                console.log("please enter a valid operation in your expression. ex:\'{\"op\" : \"add\", \"number\" : 5}\' ")
        }
    }
    return value;
}
/* Array behavior via push/pop
[0, 1, 2, 3]
[bottom, top]
*/
/* Array behavior via unshift/shift
[3, 2, 1, 0]
[top, bottom]
*/
PreCalc.prototype.push = function(value) { //should be prototype so no have mem for it in each calc, wasteful.
    this.calcStack.unshift(value);
};
PreCalc.prototype.pop = function(value) {
    return this.calcStack.shift();
};
PreCalc.prototype.print = function() { //print top to bottom.
    return this.calcStack;
};

//NOTE: MAIN
var exec = new PreCalc(0);
// NOTE: test code from word doc.
// NOTE: from part 1 - based on its own crit.
// console.log(exec.calc('{"op" : "add", "number" : 5}')); //5
// console.log(exec.calc('{"op" : "subtract", "number" : 2}')); //3
// console.log(exec.calc('{"op" : "add", "number" : 19}')); //22
// NOTE: from part 2 - based on its own crit.
// console.log(exec.calc('{"op": "subtract", "expr" : {"op" : "add", "number" : 15}}')); //returns 0 (22+15 = 37, then 37-37=0)
// console.log(exec.calc('{"op": "add", "expr" : {"op" : "add", "expr" : {"op" : "subtract", "number" : 3}}}')); //returns -12     (0-3=-3, -3+-3=-6, -6+-6=-12)

// NOTE: from part 3
// console.log( exec.calc('{"op" : "add", "number" : 5}') ); //returns 5 (5+0) but does not store the 5 on the stack. The stack remains [0]
// console.log( exec.calc( '{"op" : "push", "expr" : {"op" : "subtract", "number" : 2}}' ) ); //returns -2 and pushes -2 on top of the stack [-2 0]
// console.log( exec.calc( '{"op" : "push", "expr" : {"op" : "add", "number" : 19}}' ) ); //returns 17 (-2+19) and pushes 17 to the top of the stack [17 -2 0]
// console.log( exec.calc( '{"op" : "pop"}' ) ); //returns 17 and removes it from the stack [-2 0]
//
// console.log( exec.calc( '{"op" : "print"}' ) ); //prints [-2 0]
// console.log( exec.calc( '{"op" : "push", "expr" : {"op" : "add", "expr": {"op" :  "pop"}}}' ) ); //returns -2  (-2 + 0) [-2 0]
// console.log( exec.calc( '{"op" : "print"}' ) ); //prints [-2 0]
// console.log( exec.calc( '{"op" : "pop"}' ) ); //returns -2 [0]
// console.log( exec.calc( '{"op" : "pop"}' ) ); //returns 0 []
// console.log( exec.calc( '{"op" : "pop"}' ) ); //returns (what? You have an empty stack now)

// NOTE: lab1Act2PartC test code.(modified)
// console.log not strictly necessary
console.log(exec.calc('{"op":"add", "number": 3}')); // should return 3
console.log(exec.calc('{"op":"add", "expr": {"op":"subtract", "number":  1}}')); // should return -1
console.log(exec.calc('{"op":"add", "expr": {"op":"add", "expr": {"op":"subtract", "number": 6}}}')); // should retur-6
console.log(exec.calc('{"op":"add", "expr": {"op":"add", "expr": {"op":"add", "expr":{"op":"add", "number": 5}}}}')); // should return 5
console.log(exec.calc('{"op":"push", "number": 3}')); //should return 3
console.log(exec.calc('{"op":"print"}')); //should return [3 0]
console.log(exec.calc('{"op":"push", "number": 5}')); //should return 5
console.log(exec.calc('{"op":"print"}')); //should return [5 3 0]
console.log(exec.calc('{"op":"push", "expr": {"op":"subtract", "number":  1}}')); // should return 4 and push 4 on stack
console.log(exec.calc('{"op":"push", "expr": {"op":"add", "expr": {"op":"subtract", "number": 6}}}')); // should return 2 and push 2 on stack
console.log(exec.calc('{"op":"push", "expr": {"op":"add", "expr": {"op":"add", "expr":{"op":"add", "number": 5}}}}')); // should return 11 and push 11 on stack
console.log(exec.calc('{"op":"print"}')); //should return [11 2 4 5 3 0]
console.log(exec.calc('{"op":"push", "expr":{"op":"subtract", "number": 3}}')); //should return 8
console.log(exec.calc('{"op":"push", "number": 100}')); //should return 100
console.log(exec.calc('{"op":"push", "number": 35}')); //should return 35
console.log(exec.calc('{"op":"push", "number": 1}')); //should return 1
console.log(exec.calc('{"op":"push", "number": 10}')); //should return 10
console.log(exec.calc('{"op":"push", "expr": {"op":"subtract", "expr":{"op":"pop"}}}')); //should return -9
console.log(exec.calc('{"op":"print"}')); //should return [-9 1 35 100 8 11 2 4 5 3 0]
console.log(exec.calc('{"op":"push", "expr": {"op":"add", "number": 11}}')); //should return 2
console.log(exec.calc('{"op": "print"}')); //should return [2 -9 1 35 100 8 11 2 4 5 3 0]
console.log(exec.calc('{"op":"pop"}')); //should return 2
console.log(exec.calc('{"op":"pop"}')); //should return -9
console.log(exec.calc('{"op":"pop"}')); //should return 1
console.log(exec.calc('{"op":"pop"}')); //should return 35
console.log(exec.calc('{"op":"pop"}')); //should return 100
console.log(exec.calc('{"op":"pop"}')); //should return 8
console.log(exec.calc('{"op":"pop"}')); //should return 11
console.log(exec.calc('{"op":"pop"}')); //should return 2
console.log(exec.calc('{"op":"pop"}')); //should return 4
console.log(exec.calc('{"op":"pop"}')); //should return 5
console.log(exec.calc('{"op":"pop"}')); //should return 3
console.log(exec.calc('{"op":"pop"}')); //should return 0
console.log(exec.calc('{"op":"pop"}')); //Stack is empty
console.log(exec.calc('{"op":"pop"}')); //Stack is empty
console.log(exec.calc('{"op":"pop"}')); //Stack is empty

console.log("Stack Trace:", exec.print());
