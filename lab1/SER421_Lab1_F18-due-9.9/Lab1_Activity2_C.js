// console.log not strictly necessary
console.log(exec.calc('{"op":"add", "number": 3}'));  // should return 3
console.log(exec.calc('{"op":"add", "expr": {"op":"subtract", "number":  1}}'));  // should return -1
console.log(exec.calc('{"op":"add", "expr": {"op":"add", "expr": {"op":"subtract", "number": 6}}}'));  // should retur-6
console.log(exec.calc('{"op":"add", "expr": {"op":"add", "expr": {"op":"add", "expr":{"op":"add", "number": 5}}}}'));  // should return 5
console.log(exec.calc('{"op":"push", "number": 3}')); //should return 3
console.log(exec.calc('{"op":"print"}')); //should return [3 0]
console.log(exec.calc('{"op":"push", "number": 5}')); //should return 5
console.log(exec.calc('{"op":"print"}')); //should return [5 3 0]
console.log(exec.calc('{"op":"push", "expr": {"op":"subtract", "number":  1}}'));  // should return 4 and push 4 on stack
console.log(exec.calc('{"op":"push", "expr": {"op":"add", "expr": {"op":"subtract", "number": 6}}}'));  // should return 2 and push 2 on stack
console.log(exec.calc('{"op":"push", "expr": {"op":"add", "expr": {"op":"add", "expr":{"op":"add", "number": 5}}}}'));  // should return 11 and push 11 on stack
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

console.log("Stack Trace:",exec.print());
