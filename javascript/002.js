function foo() {
  console.log(this);
}
const fooProxy = new Proxy(foo, {
  apply(target, thisArg, argArray) {
    console.log("apply调用");
    target.apply(thisArg, argArray);
  },
  construct(target, argArray) {
    console.log("监听到new调用");
    return new target(...argArray);
  },
});

fooProxy.apply({ a: "xx" });
new fooProxy();
