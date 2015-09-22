import path from 'path';

global.__PORT__ = process.env.PORT;
global.__PRODUCTION__ = process.env.NODE_ENV === 'production';
global.__WEBPACK__ = false;
global.REACT_APP_ROOT = path.resolve('../react-pywws');

module.exports = require('./lib/nodepywws');

