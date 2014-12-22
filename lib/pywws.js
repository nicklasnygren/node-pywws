var Promise   = require('bluebird');
var csv       = require('csv');
var fs        = Promise.promisifyAll(require('fs'));

var getDateRange = function (start, end) {
  var res     = [];
  var curDate = (new Date(start));

  do {
    res.push(curDate.toISOString().split('T')[0]);
    curDate = new Date((new Date(curDate)).setDate(curDate.getDate() + 1));
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

    var getCSV = function (filename) {
      if (!filename) {
        throw new Error('pywws.getDateContents called without date');
      }
      return fs.readFileAsync(filename).
        then(function (data) {
          return new Promise(function (resolve, reject) {
            return csv.parse(data.toString('utf-8'), function (err, data) {
              if (err) {
                return reject(err);
              }
              resolve(data);
            });
          });
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
      var reads = getFilenameRange(start, end).
        map(getCSV);
    };

    return {
      get:              get,
      getCSV:           getCSV,
      getDateRange:     getDateRange,
      getFilenameRange: getFilenameRange
    };
  };
};

