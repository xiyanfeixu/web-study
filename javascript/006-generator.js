function* foo() {
  const value1 = 1;
  console.log(value1);
  const n = yield value1;

  const value2 = 2;
  console.log(value2);
  yield value2 * n;

  const value3 = 3;
  console.log(value3);
  return value3;
}

const generator = foo();

console.log("return===", generator.next());
// console.log("return===", generator.next(100));
// console.log("return===", generator.return(100));
console.log("return===", generator.throw("error"));
console.log("return===", generator.next());
console.log("return===", generator.next());
console.log("return===", generator.next());
