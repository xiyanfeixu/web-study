const names = ["jin", "suga", "jhope", "rm", "jimin", "v", "jk"];

//* 可迭代对象
const iterableObj = {
  [Symbol.iterator]: function* () {
    // for (const item of names) {
    //   yield item;
    // }
    yield* names;
  },
};
const generator = iterableObj[Symbol.iterator]();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

//* 自定义类的迭代
class CIterator {
  constructor(names) {
    this.names = names;
  }
  *[Symbol.iterator]() {
    yield* this.names;
  }
}
const ci = new CIterator(names);
for (const item of ci) {
  console.log(item);
}
