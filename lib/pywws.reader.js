import Promise from 'bluebird';
import csv from 'csv';
import {dateRange, intRange} from './range';
import _fs from 'fs';
import { getStatus } from './pywws.iniparser';

const fs = Promise.promisifyAll(_fs);

export default function pywwsReader(pywwsDescriptor) {
  const folderName = pywwsDescriptor.name;

  // Get file name for specified date
  //
  function getFilenameForDate(date) {
    let filename = pywwsDescriptor.getFilename.apply(null, date.split('-'));
    return PYWWS_ROOT + '/' + folderName + '/' + filename + '.txt';
  }

  // Map CSV columns to column names
  //
  function objectFactory(data, columns) {
    let res = {};
    for (let i = 0; i < data.length; i++) {
      if (!columns || columns.indexOf(pywwsDescriptor.columns[i]) !== -1) {
        res[pywwsDescriptor.columns[i]] = data[i];
      }
    }
    return res;
  }

  // Get CSV data from file by specified filename
  //
  function getCSV(filename) {
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
  }

  // Get all file names for specified date range
  //
  function getFilenameRange(start, end) {
    return dateRange(start, end).
      map(getFilenameForDate).
      filter(function (item, pos, arr) {
      return arr.indexOf(item) === pos;
    });
  }

  // Get all items in a specified date range
  //
  function get(start, end, columns) {
    let reads = getFilenameRange(start, end).
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
          let date = new Date(item[0]);
          return date >= start && date <= end;
        });
      });
    }).
      then(function (data) {
      return Array.prototype.concat.apply([], data).
        map((item) => objectFactory(item, columns));
    });
  }

  // Get the first post before or after specified date
  //
  // TODO: Make more efficient
  //
  function getOne(date, before, columns) {
    if (!(date instanceof Date)) {
      date = new Date(parseInt(date));
    }
    let firstTryFilename = getFilenameForDate(date.toISOString().split('T')[0]);

    return (function () {
      return fs.statAsync(firstTryFilename).
        then(function (stat) {
        return firstTryFilename;
      }).
        catch(function (err) {
        let curDate = new Date(date*1);
        let maxDate = (new Date()).setDate((new Date()).getDate()+1);
        let filename;

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
      let idx = before ? results.length - 1 : 0;
      return results.length ? objectFactory(results[idx], columns) : null;
    });

    function dateTimeFilter(item) {
      let timestamp = new Date(item[0]);

      if (before) {
        return timestamp <= date;
      }
      else {
        return timestamp >= date;
      }
    }
  }

  // Get the absolutely first item
  //
  function getFirst(...params) {
    let found = false;
    let yearRange = dateRange(1970, (new Date()).getFullYear());
    let yearQueries = yearRange.map(function (year) {
      return new Promise(function (resolve, reject) {
        return fs.stat(PYWWS_ROOT + '/' + folderName + '/' + year, function (err, stats) {
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
      return getOne(new Date(year + '-01-01 00:00:00'), false, ...params);
    });
  }

  // Get the absolutely latest item
  //
  function getLatest(...params) {
    return getStatus().
      then(function (status) {
      let date = status['last update'][pywwsDescriptor.name];
      return date || status['last update']['logged'];
    }).
      then(function (latestUpdateDate) {
      return getOne(new Date(latestUpdateDate), true, ...params);
    });
  }

  return {
    get: get,
    getOne: getOne,
    getFirst: getFirst,
    getLatest: getLatest,
    getCSV: getCSV,
    getFilenameRange: getFilenameRange,
  };
};

