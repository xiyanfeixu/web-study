async function async1() {
  console.log("async start");
  await async2();
  console.log("async end");
}

async function async2() {
  console.log("async2");
}
console.log("script start");

setTimeout(() => {
  console.log("setTimeout 0");
}, 0);

setTimeout(() => {
  console.log("setTimeout 3");
}, 3);

setImmediate(() => {
  console.log("setImmediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

async1();

new Promise((res) => {
  console.log("promise1");
  res();
  console.log("promise2");
}).then(() => {
  console.log("promise 3");
});

console.log("script end");

// 答案如下
// script start
// async start
// async2
// promise1
// promise2
// script end
// nextTick
// async end
// promise 3
// setTimeout 0
// setImmediate
// setTimeout 3
