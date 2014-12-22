var Promise = require('bluebird');
var fs      = Promise.promisifyAll(require('fs'));

var getDateRange = function (start, end) {
  var res     = [];
  var curDate = (new Date(start));

  do {
    curDate = new Date((new Date(curDate)).setDate(curDate.getDate() + 1));
    res.push(curDate.toISOString().split('T')[0]);
  }
  while (curDate <= end);

  return res;
};

module.exports = function (app) {
  var basePath = app.get('pywws_root');

  return function (pywwsDescriptor) {
    // Error handling
    if (!pywwsDescriptor) {
      throw new Error('pywws called without descriptor');
    }
    if (!pywwsDescriptor.name) {
      throw new Error('pywws called without name');
    }
    if (!pywwsDescriptor.getFilename || (typeof pywwsDescriptor.getFilename !== 'function')) {
      throw new Error('pywws called without proper filename getter');
    }

    var folderName          = pywwsDescriptor.name;
    var getFilenameForDate  = function (date) {
      return pywwsDescriptor.getFilename.apply(null, date.split('-'));
    };

    var getDateContents = function (date, startTime, endTime) {
      return new Promise(function (resolve, reject) {
        if (!date) {
          throw new Error('pywws.getDateContents called without date');
        }
        var filePath = getFilenameForDate(date);
      });
    };

    var getFilenameRange = function (start, end) {
      return getDateRange(start, end).
        map(getFilenameForDate).
        filter(function (item, pos, arr) {
          return arr.indexOf(item) === pos;
        }).
        map(function (filename) {
          return basePath + '/' + folderName + '/' + filename + '.txt';
        });
    };

    var get = function (start, end) {
      var range = getFilenameRange(start, end);
    };

    return {
      get:              get,
      getDateContents:  getDateContents,
      getDateRange:     getDateRange,
      getFilenameRange: getFilenameRange
    };
  };
};

