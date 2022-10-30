function requestData(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 2000);
  });
}

function* getData() {
  const res1 = yield requestData("jk");
  const res2 = yield requestData(res1 + "-" + "suga");
  const res3 = yield requestData(res2 + "-" + "jimin");
  console.log(res3);
}
const generator = getData();
generator.next().value.then((res) => {
  generator.next(res).value.then((res) => {
    generator.next(res).value.then((res) => {
      generator.next(res);
    });
  });
});
