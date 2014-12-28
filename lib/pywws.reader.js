var Promise     = require('bluebird');
var csv         = require('csv');
var range       = require('./range');
var fs          = Promise.promisifyAll(require('fs'));

module.exports = function (app) {
  var basePath  = app.get('pywws_root');
  var ini       = require('./pywws.iniparser')(app);

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

    var folderName = pywwsDescriptor.name;

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
      return range.date(start, end).
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
    // TODO: Make more efficient
    //
    var getOne = function (date, before) {
      if (!(date instanceof Date)) {
        date = new Date(parseInt(date));
      }
      var firstTryFilename = getFilenameForDate(date.toISOString().split('T')[0]);
      var dateTimeFilter = function (item) {
        var timestamp = new Date(item[0]);

        if (before) {
          return timestamp <= date;
        }
        else {
          return timestamp >= date;
        }
      };

      return (function () {
        return fs.statAsync(firstTryFilename).
          then(function (stat) {
            return firstTryFilename;
          }).
          catch(function (err) {
            var curDate = new Date(date*1);
            var maxDate = (new Date()).setDate((new Date()).getDate()+1);
            var filename;

            do {
              curDate.setDate(curDate.getDate()+1);
              filename = getFilenameForDate(curDate.toISOString().split('T')[0]);

              try {
                if (fs.statSync(filename)) {
                  return filename;
                }
              }
              catch (err) {
                //
              }
            } while (curDate <= maxDate);
          });
      }())
      .then(function (filename) {
        return filename;
      })
      .then(getCSV)
      .then(function (results) {
        if (pywwsDescriptor.name === 'monthly') {
          return [results[0]];
        }
        else {
          return results.filter(dateTimeFilter);
        }
      })
      .then(function (results) {
        var idx = before ? results.length - 1 : 0;
        return results.length ? objectFactory(results[idx]) : null;
      });
    };

    // Get the absolutely first item
    //
    var getFirst = function () {
      var found       = false;
      var yearRange   = range.int(1970, (new Date()).getFullYear());
      var yearQueries = yearRange.map(function (year) {
        return new Promise(function (resolve, reject) {
          return fs.stat(basePath + '/' + folderName + '/' + year, function (err, stats) {
            if (err) {
              return reject(err);
            }
            else {
              resolve(year);
            }
          });
        });
      });

      return Promise.settle(yearQueries).
        then(function (queries) {
          return queries.
            filter(function (query) {
              return query.isFulfilled() && query.value();
            }).
            map(function (query) {
              return query.value();
            }).
            sort(function (a, b) {
              return a - b;
            });
        }).
        then(function (years) {
          return years[0];
        }).
        then(function (year) {
          return getOne(new Date(year + '-01-01 00:00:00'));
        });
    };

    // Get the absolutely latest item
    //
    var getLatest = function () {
      return ini.getStatus().
        then(function (status) {
          var date = status['last update'][pywwsDescriptor.name];
          return date || status['last update']['logged'];
        }).
        then(function (latestUpdateDate) {
          return getOne(new Date(latestUpdateDate), true);
        });
    };

    return {
      get:                get,
      getOne:             getOne,
      getFirst:           getFirst,
      getLatest:          getLatest,
      getCSV:             getCSV,
      getFilenameRange:   getFilenameRange
    };
  };
};

