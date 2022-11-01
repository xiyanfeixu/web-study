const PromiseStatus = {
  Pending: "Pending",
  Fulfilled: "Fulfilled",
  Rejected: "Rejected",
};
class MyPromise {
  constructor(func) {
    this.status = PromiseStatus.Pending;
    const resolve = (value) => {
      queueMicrotask(() => {
        if (this.status === PromiseStatus.Pending) {
          this.status = PromiseStatus.Fulfilled;
          this.fulfillFn && this.fulfillFn(value);
        }
      });
    };
    const reject = (reason) => {
      queueMicrotask(() => {
        if (this.status === PromiseStatus.Pending) {
          this.status = PromiseStatus.Rejected;
          this.rejectFn && this.rejectFn(reason);
        }
      });
    };
    func(resolve, reject);
  }
  then(fulfillFn, rejectFn) {
    this.fulfillFn = fulfillFn;
    this.rejectFn = rejectFn;
  }
}
const promise = new MyPromise((resolve, reject) => {
  reject();
  resolve();
});
promise.then(
  (res) => {
    console.log("res", res);
  },
  (err) => {
    console.log("err", err);
  }
);
