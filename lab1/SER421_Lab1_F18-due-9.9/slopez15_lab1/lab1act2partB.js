/*
   Name: Saul Lopez
   asurite: slopez15
   class: 421
   date: 9/4/2018
*/
let value = 0;

function calc(string) {
    //convert string to JSON
    let operation = JSON.parse(string);
    //if expression nested, do the following, else do something else for single op strings.

    //MULTI-EXPRESSION
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
            default:
                console.log("please enter a valid operation in your inner most expression. ex:\'{\"op\" : \"add\", \"number\" : 5}\' ")
        }
        while (opArr.length > 0) { //at this point there should be at least 1 operation left.
            currentOp = opArr.pop();
            switch (currentOp) {
                case "add":
                    value += value;
                    break;
                case "subtract":
                    value -= value;
                    break;
                case "multiply":
                    value *= value;
                    break;
                case "divide":
                    value /= value;
                    break;
                default:
                    console.log("please enter a valid operation in your expression. ex:\'{\"op\" : \"add\", \"number\" : 5}\' ")
            }
        }
    }

    //SINGLE EXPRESSION.
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
            default:
                console.log("please enter a valid operation in your expression. ex:\'{\"op\" : \"add\", \"number\" : 5}\' ")
        }
    }
    return value;
}


//NOTE: MAIN
// NOTE: Test code from word doc.
// NOTE: from part 1 - based on its own crit.
// console.log(calc('{"op" : "add", "number" : 5}')); //5
// console.log(calc('{"op" : "subtract", "number" : 2}')); //3
// console.log(calc('{"op" : "add", "number" : 19}')); //22
// NOTE: from part 2
// console.log(calc('{"op": "subtract", "expr" : {"op" : "add", "number" : 15}}')); //returns 0 (22+15 = 37, then 37-37=0)
// console.log(calc('{"op": "add", "expr" : {"op" : "add", "expr" : {"op" : "subtract", "number" : 3}}}')); //returns -12     (0-3=-3, -3+-3=-6, -6+-6=-12)

// NOTE: lab1Act2PartB test code.(modified)
// console.log is just here to ensure output to screen, it is not required
console.log(calc('{"op":"add", "number": 3}')); // should return 3
console.log(calc('{"op":"add", "expr": {"op":"subtract", "number":  1}}')); // should return 4
console.log(calc('{"op":"add", "expr": {"op":"add", "expr": {"op":"subtract", "number": 6}}}')); // should return -8
console.log(calc('{"op":"add", "expr": {"op":"add", "expr": {"op":"add", "expr":{"op":"add", "number": 5}}}}')); // should return -24
console.log(calc('{"op":"subtract", "number": 10}')); // should return -34
console.log(calc('{"op":"add", "number": 15}')); // should return -19
console.log(calc('{"op":"subtract", "expr":{"op":"add", "expr": {"op":"subtract", "expr":{"op":"add", "number": 1}}}}')); // should return 0
