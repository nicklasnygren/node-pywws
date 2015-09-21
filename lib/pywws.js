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
  let keys = Object.keys(datasets);
  let queries = keys.map((dataset) => {
    return datasets[dataset].get(start, end);
  });

  return Promise.all(queries).then((res) => {
    let ret = {};
    res.forEach(function (r, idx) {
      ret[keys[idx]] = r;
    });
    return ret;
  });
};

