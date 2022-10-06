const obj = { name: "xz", age: 18 };

let activeReactiveFn = null;
class Depend {
  constructor() {
    this.reactiveFns = new Set();
  }
  addDepend(fn) {
    fn && this.reactiveFns.add(fn);
  }
  depend() {
    this.addDepend(activeReactiveFn);
  }
  notify() {
    this.reactiveFns.forEach((fn) => {
      fn();
    });
  }
}

const targetMap = new WeakMap();
function findDepend(target, key) {
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

function reactiveObj(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const depend = findDepend(target, key);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newVal, receiver) {
      Reflect.set(target, key, newVal, receiver);
      const depend = findDepend(target, key);

      depend.notify();
    },
  });
}
const objProxy = reactiveObj(obj);
watchFn(function () {
  console.log(`name=======${objProxy.name}`);
});
watchFn(function () {
  console.log(`age******${objProxy.age}`);
});

objProxy.name = "jk";

const info = reactiveObj({ color: "purple" });
watchFn(function () {
  console.log(`color=========${info.color}`);
});
info.color = "green";
