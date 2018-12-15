// console.log is just here to ensure output to screen, it is not required
console.log(exec.calc('{"op":"add", "number": 3}')); // should return 3
console.log(exec.calc('{"op":"add", "expr": {"op":"subtract", "number":  1}}')); // should return 4
console.log(exec.calc('{"op":"add", "expr": {"op":"add", "expr": {"op":"subtract", "number": 6}}}')); // should return -8
console.log(exec.calc('{"op":"add", "expr": {"op":"add", "expr": {"op":"add", "expr":{"op":"add", "number": 5}}}}')); // should return -24
console.log(exec.calc('{"op":"subtract", "number": 10}')); // should return -34
console.log(exec.calc('{"op":"add", "number": 15}')); // should return -19
console.log(exec.calc('{"op":"subtract", "expr":{"op":"add", "expr": {"op":"subtract", "expr":{"op":"add", "number": 1}}}}')); // should return 0
