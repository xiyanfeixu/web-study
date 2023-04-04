interface Person {
  name: string;
  age: number;
}

function getInfo(prop: keyof Person, obj: Person) {
  console.log(obj[prop]);
}
getInfo("name", { name: "xz", age: 1 });
