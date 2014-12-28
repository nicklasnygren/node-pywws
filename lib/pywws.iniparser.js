var Promise = require('bluebird');
var ini     = Promise.promisifyAll(require('iniparser'));

module.exports = function (app) {
  var basePath = app.get('pywws_root');

  var getStatus = function () {
    return ini.parseAsync(basePath + '/status.ini');
  };

  var getSettings = function () {
    return ini.parseAsync(basePath + '/weather.ini');
  };

  return {
    getStatus:    getStatus,
    getSettings:  getSettings
  }
};

