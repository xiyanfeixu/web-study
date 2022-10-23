const Status = {
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
};
function execFunction(fn, value, resolve, reject) {
  try {
    const result = fn(value);
    resolve(result);
  } catch (err) {
    reject(err);
  }
}
class MyPromise {
  constructor(func) {
    this.value = undefined;
    this.message = undefined;
    this.status = Status.PENDING;
    this.fulfilledFns = [];
    this.rejectedFns = [];

    const resolve = (value) => {
      queueMicrotask(() => {
        if (this.status === Status.PENDING) {
          this.status = Status.FULFILLED;
          this.value = value;

          this.fulfilledFns?.forEach((fn) => {
            fn(this.value);
          });
        }
      });
    };
    const reject = (message) => {
      queueMicrotask(() => {
        if (this.status === Status.PENDING) {
          this.status = Status.REJECTED;
          this.message = message;
          this.rejectedFns?.forEach((fn) => {
            fn(this.value);
          });
        }
      });
    };
    try {
      func(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(fulfilledFn, rejectedFn) {
    fulfilledFn = fulfilledFn || ((value) => value);
    rejectedFn =
      rejectedFn ||
      ((err) => {
        throw err;
      });
    return new MyPromise((resolve, reject) => {
      if (this.status === Status.FULFILLED) {
        execFunction(fulfilledFn, this.value, resolve, reject);
      }
      if (this.status === Status.REJECTED) {
        execFunction(rejectedFn, this.message, resolve, reject);
      }

      this.fulfilledFns.push(() => {
        execFunction(fulfilledFn, this.value, resolve, reject);
      });
      this.rejectedFns.push(() => {
        execFunction(rejectedFn, this.message, resolve, reject);
      });
    });
  }
  catch(func) {
    return this.then(null, func);
  }
  finally(func) {
    this.then(func, func);
  }
  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(err) {
    return new MyPromise((_, reject) => {
      reject(err);
    });
  }
  static all(arr) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      arr?.forEach((item) => {
        item.then(
          (res) => {
            result.push(res);
            if (result.length === arr.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
  static allSettled(arr) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      arr?.forEach((item) => {
        item.then(
          (res) => {
            result.push({ status: Status.FULFILLED, data: res });
            if (result.length === arr.length) {
              resolve(result);
            }
          },
          (err) => {
            result.push({ status: Status.REJECTED, data: err });
            if (result.length === arr.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }
  static race(arr) {
    return new MyPromise((resolve, reject) => {
      arr?.forEach((item) => {
        item.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
  static any(arr) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      arr?.forEach((item) => {
        item.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            result.push(err);
            if (result.length === arr.length) {
              reject(result);
            }
          }
        );
      });
    });
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(11);
  }, 3000);
});

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(22);
  }, 1000);
});
const p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(33);
  }, 3000);
});
MyPromise.any([p1, p2, p3])
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  });
