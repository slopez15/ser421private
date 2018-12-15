// console.log is just here to ensure output to screen, it is not required
console.log(exec.calc('{"op":"add", "number": 0}'));  // should return 0
console.log(exec.calc('{"op":"add", "number": -1}'));  // should return -1
console.log(exec.calc('{"op":"subtract", "number": -1}'));  // should return 0
console.log(exec.calc('{"op":"add", "number": 5}'));  // should return 5
console.log(exec.calc('{"op":"subtract", "number": 10}'));  // should return -5
console.log(exec.calc('{"op":"add", "number": 15}'));  // should return 10
