new Promise((resolve) => {
  resolve(0);
})
  .then((res) => {
    console.log(res);
    return Promise.resolve(Promise.resolve("x"));
    // return "x";
  })
  .then((res) => {
    console.log(res);
  });

new Promise((resolve) => {
  resolve(1);
})
  .then((re) => {
    console.log(re);
    return 3;
  })
  .then((re) => {
    console.log(re);
    return 4;
  })
  .then((re) => {
    console.log(re);
    return 5;
  })
  .then((re) => {
    console.log(re);
  });
