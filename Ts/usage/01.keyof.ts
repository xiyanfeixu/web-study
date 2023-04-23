var obj = {
  name: "xz",
  age: 11,
};
function getVal<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
console.log(getVal(obj, "age"));
