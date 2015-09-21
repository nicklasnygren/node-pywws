import { query } from '../pywws.query';
import reader from '../pywws.reader';

/**
 * @class PywwsDataset
 *
 * Wrapper class for Pywws datasets. Abstraction that contains methods for fetching
 * data. In a web environment, this is done via XHR. In node, this is done using the
 * file system.
 *
 */
export class PywwsDataset {

  /**
   * @constructs PywwsDataset
   * @param {String} type What dataset?
   */
  constructor(type, columns) {
    this.type = type;
    this.columns = columns;

    // If this is on node, we create a pywws.reader instance so we can fech files
    if (!__WEBPACK__) {
      let descriptor = {
        name: this.type,
        getFilename: this.getFilename,
        columns: this.columns,
      };
      this.reader = reader(descriptor);
    }
  }

  /**
   * @function get
   * @param {Date} start
   * @param {Date} end
   */
  get(...params) {
    if (__WEBPACK__) {
      //
    }
    else {
      return this.reader.get(...params);
    }
  }

  /**
   * @function getOne
   * @param {Date} date
   * @param {Boolean} before
   */
  getOne(...params) {
    if (__WEBPACK__) {
      //
    }
    else {
      return this.reader.getOne(...params);
    }
  }

  /**
   * @function getFirst
   */
  getFirst(...params) {
    if (__WEBPACK__) {
      //
    }
    else {
      return this.reader.getFirst(...params);
    }
  }

  /**
   * @function getLatest
   */
  getLatest(...params) {
    if (__WEBPACK__) {
      //
    }
    else {
      return this.reader.getLatest(...params);
    }
  }
}

