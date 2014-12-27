var Promise   = require('bluebird');
var csv       = require('csv');
var fs        = Promise.promisifyAll(require('fs'));

var getDateRange = function (start, end) {
  var res     = [];
  var curDate = (new Date(start * 1));

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

    // Get file name for specified date
    //
    var getFilenameForDate  = function (date) {
      var filename = pywwsDescriptor.getFilename.apply(null, date.split('-'));
      return basePath + '/' + folderName + '/' + filename + '.txt';
    };

    // Map CSV columns to column names
    //
    var objectFactory = function (data) {
      var res = {};
      for (var i = 0; i < data.length; i++) {
        res[pywwsDescriptor.columns[i]] = data[i];
      }
      return res;
    }

    // Get CSV data from file by specified filename
    //
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
        }).
        catch(function (err) {
          return [];
        });
    };

    // Get all file names for specified date range
    //
    var getFilenameRange = function (start, end) {
      return getDateRange(start, end).
        map(getFilenameForDate).
        filter(function (item, pos, arr) {
          return arr.indexOf(item) === pos;
        });
    };

    // Get all items in a specified date range
    //
    var get = function (start, end) {
      var reads = getFilenameRange(start, end).
        map(getCSV);

      return Promise.settle(reads).
        then(function (results) {
          return results.
            filter(function (result) {
              return result.isFulfilled();
            }).
            map(function (result) {
              return result.value().
              filter(function (item) {
                var date = new Date(item[0]);
                return date >= start && date <= end;
              });
            });
        }).
        then(function (data) {
          return Array.prototype.concat.apply([], data).
            map(objectFactory);
        });
    };

    // Get the first post before or after specified date
    //
    var getOne = function (date, before) {
      var dateTimeFilter = function (item) {
        var refDate   = new Date(date);
        var timestamp = new Date(item[0]);

        if (before) {
          return timestamp <= refDate;
        }
        else {
          return timestamp >= refDate;
        }
      };

      return getCSV(getFilenameForDate(date.toISOString().split('T')[0])).
        then(function (results) {
          return results.filter(dateTimeFilter);
        }).
        then(function (results) {
          var idx = before ? results.length - 1 : 0;
          return results.length ? results[idx] : null;
        });
    };

    // Get the latest item before the specified date
    //
    var getLatest = function () {
      return getOne(new Date(), true);
    };

    return {
      get:              get,
      getOne:           getOne,
      getLatest:        getLatest,
      getCSV:           getCSV,
      getDateRange:     getDateRange,
      getFilenameRange: getFilenameRange
    };
  };
};

