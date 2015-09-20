import path from 'path';

global.__WEBPACK__ = false;
global.REACT_APP_ROOT = path.resolve('../react-pywws');

module.exports = require('./lib/nodepywws');

