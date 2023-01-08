class myEventBus {
  constructor() {
    this.eventBus = {};
  }
  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }
    handlers.push({ eventCallback, thisArg });
  }
  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    const newHandlers = [...handlers];
    for (let i = 0; i < newHandlers.length; i++) {
      if (newHandlers[i].eventCallback === eventCallback) {
        handlers.splice(i, 1);
      }
    }
  }
  emit(eventName, ...paylaod) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach((handler) => {
      handler.eventCallback.apply(handler.thisArg, paylaod);
    });
  }
}
const bus = new myEventBus();
bus.on(
  "test",
  function (val) {
    console.log("test1", this.name, val);
  },
  { name: "xz" }
);
function test(val) {
  console.log("test2", this.name, val);
}
bus.on("test", test, { name: "jk" });

bus.emit("test", "v");

bus.off("test", test);
bus.emit("test");
