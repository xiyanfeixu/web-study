//* 迭代器
const names = ["jin", "suga", "jhope", "rm", "jimin", "v", "jk"];
let index = 0;
const iteratorObj = {
  next() {
    if (index < names.length) {
      return { value: names[index++], done: false };
    }
    return { value: undefined, done: true };
  },
};

// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());

//* 可迭代对象
const iterableObj = {
  [Symbol.iterator]: () => iteratorObj,
};
// console.log(iterableObj[Symbol.iterator].next());
// console.log(iterableObj[Symbol.iterator].next());
// console.log(iterableObj[Symbol.iterator].next());
// console.log(iterableObj[Symbol.iterator].next());
// console.log(iterableObj[Symbol.iterator].next());
// console.log(iterableObj[Symbol.iterator].next());
// console.log(iterableObj[Symbol.iterator].next());
// console.log(iterableObj[Symbol.iterator].next());
// console.log(iterableObj[Symbol.iterator].next());
// console.log(iterableObj[Symbol.iterator].next());

// for (const item of iterableObj) {
//   console.log(item);
// }

//* 原生迭代对象
var str = "jk";
const set = new Set();
set.add("jk");
set.add("suga");
var mm = new Map();
mm.set("7", "jk");
mm.set("6", "v");
// for (const item of mm) {
//   console.log(item);
// }

//* 自定义类的迭代
class CIterator {
  constructor(names) {
    this.names = names;
  }
  [Symbol.iterator] = () => ({
    next: () => {
      if (index < this.names.length) {
        return { value: this.names[index++], done: false };
      }
      return { value: undefined, done: true };
    },
    return() {
      console.log("迭代器中断");
      return { value: undefined, done: true };
    },
  });
}
const ci = new CIterator(names);
for (const item of ci) {
  if (item === "rm") {
    break;
  }
  console.log(item);
}
