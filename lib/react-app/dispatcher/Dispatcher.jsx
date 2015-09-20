/**
 * @class Dispatcher
 *
 * TODO: Add description
 */
export default class Dispatcher {

  /**
   * @constructs Dispatcher
   */
  constructor() {
    this.callbacks = [];
    this.promises = [];
  }

  /**
   * @function register
   * @param {*} callback
   */
  register(callback) {
    this.callbacks.push(callback);
    return this.callbacks.length - 1;
  }

  /**
   * @function dispatch
   * @param {*} payload
   */
  dispatch(payload) {
    const resolves = [];
    const rejects = [];
    this.promises = this.callbacks.map((_, i) => new Promise((resolve, reject) => {
      resolves[i] = resolve;
      rejects[i] = reject;
    }));
    this.callbacks.forEach((callback, i) => {
      Promise.resolve(callback(payload)).then(() => {
        resolves[i](payload);
      }, () => {
        rejects[i](new Error('Dispatcher callback unsuccessful'));
      });
    });
    this.promises = [];
  }
}
