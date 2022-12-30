const obj = {
  name: "xz",
  foo: function () {
    console.log(this.name);
  },
};
var obj2 = { name: "xz3" };
obj.foo.call(obj2);
