var obj = {
  _name: "xz",
  get name() {
    return this._name;
  },
  set name(val) {
    this._name = val;
  },
};
var objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("====get");
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("====set");
    Reflect.set(target, key, value, receiver);
  },
  has(target, key) {
    return key in target;
  },
  deleteProperty(target, key) {
    delete target[key];
  },
});

console.log("name" in objProxy);
delete objProxy.name;
console.log(obj);
