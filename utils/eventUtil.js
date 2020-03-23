import EventEmitter from "events";

class AppEventEmitter {
  constructor() {
    this.appEventEmitter = new EventEmitter();
  }
  getEventEmitter() {
    return this.appEventEmitter;
  }
  setMaxListeners(value) {
    this.appEventEmitter.setMaxListeners(value);
  }
  on(eventName, listener) {
    this.appEventEmitter.on(eventName, listener);
  }
  removeEventListener(eventName, listener) {
    this.appEventEmitter.removeListener(eventName, listener);
  }
  emit(event, ...payload) {
    this.appEventEmitter.emit(event, payload);
  }
}
const client = new AppEventEmitter();
export default client;
