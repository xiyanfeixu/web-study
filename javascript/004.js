const promise = new Promise((resolve, reject) => {
  //! resolve传参的三种形式
  //   resolve("xz");
  //
  //   resolve(
  //     new Promise((_resolve) => {
  //       _resolve("jk");
  //     })
  //   );
  //
  //   resolve({
  //     then(_resolve) {
  //       _resolve("bts");
  //     },
  //   });

  reject("err");
});
promise.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
//   .catch((err) => {
//     console.log(err);
//   });

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("i need you");
  }, 2000);
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("spring day");
  }, 1000);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("boy in luv");
  }, 3000);
});

Promise.all([promise1, promise2, promise3])
  .then((res) => {
    console.log("all===", res);
  })
  .catch((err) => {
    console.log("all===err", err);
  });

Promise.allSettled([promise1, promise2, promise3])
  .then((res) => {
    console.log("allSettled===", res);
  })
  .catch((err) => {
    console.log("allSettled===err===", err);
  });

Promise.race([promise1, promise2, promise3])
  .then((res) => {
    console.log("race====", res);
  })
  .catch((err) => {
    console.log("race====err==", err);
  });

Promise.any([promise1, promise2, promise3])
  .then((res) => {
    console.log("any===", res);
  })
  .catch((err) => {
    console.log("any===err==", err);
  });
