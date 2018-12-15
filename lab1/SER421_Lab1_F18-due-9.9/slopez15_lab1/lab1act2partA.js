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
    //conduct operation between number and initial 0
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
    return value;
}


//NOTE: MAIN
// NOTE: Test code from word doc.
// console.log(calc( '{"op" : "add", "number" : 5}' )); //5
// console.log(calc( '{"op" : "subtract", "number" : 2}' )); //3
// console.log(calc( '{"op" : "add", "number" : 19}' )); //22

// NOTE: lab1Act2PartA test code.(modified)
// console.log is just here to ensure output to screen, it is not required
console.log(calc('{"op":"add", "number": 0}')); // should return 0
console.log(calc('{"op":"add", "number": -1}')); // should return -1
console.log(calc('{"op":"subtract", "number": -1}')); // should return 0
console.log(calc('{"op":"add", "number": 5}')); // should return 5
console.log(calc('{"op":"subtract", "number": 10}')); // should return -5
console.log(calc('{"op":"add", "number": 15}')); // should return 10
