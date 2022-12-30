function myDebounce(fn, delay = 0, isImmediate = false) {
  let timer;
  let isStart = true;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (isImmediate && isStart) {
      fn.apply(this, args);
      isStart = false;
    }
    timer = setTimeout(() => {
      fn.apply(this);
    }, delay);
  };
}

const inputEl = document.querySelector("#test");
inputEl.oninput = myDebounce(
  function () {
    console.log(1, this);
  },
  300,
  true
);
