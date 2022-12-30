function isEmpty(val) {
  const type = typeof val;
  return type !== "object" || val == null;
}
function copy(val, map = new WeakMap()) {
  if (isEmpty(val)) {
    return val;
  }
  if (map.has(val)) {
    return map.get(val);
  }
  const result = Array.isArray(val) ? [] : {};
  map.set(val, result);

  for (const key in val) {
    result[key] = copy(val[key], map);
  }
  return result;
}
var obj = { a: { x: 1, z: 2 }, b: [1, 3, 4], c: 4 };
obj.info = obj;
var cObj = copy(obj);
cObj.a.z = 5;
console.log(cObj.info);
