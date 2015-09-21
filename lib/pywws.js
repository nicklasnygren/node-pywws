import Promise from 'bluebird';
import {
  PywwsRawDataset,
  PywwsDailyDataset,
  PywwsHourlyDataset,
  PywwsMonthlyDataset
} from './datasets';

export const datasets = {
  raw: new PywwsRawDataset(),
  daily: new PywwsDailyDataset(),
  hourly: new PywwsHourlyDataset(),
  monthly: new PywwsMonthlyDataset()
};

// Get data from all storages for a given date range
//
export function getAll(start, end) {
  var keys = Object.keys(datasets);
  var queries = keys.
    map(function (dataset) {
    return datasets[dataset].get(start, end);
  });

  return Promise.settle(queries).
    then(function (finishedQueries) {
    var res = {};
    finishedQueries.
      forEach(function (query, idx) {
      if (!query.isFulfilled()) return;
      res[keys[idx]] = query.value();
    });
    return res;
  });
};

