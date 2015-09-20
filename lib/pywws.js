import Promise from 'bluebird';
export const datasets = {};
import pywwsReader from './pywws.reader';
import iniparser from './pywws.iniparser';

datasets.raw = pywwsReader({
  name: 'raw',
  getFilename: function (year, month, day) {
    return [
      year,
      year + '-' + month,
      [year, month, day].join('-')
    ].join('/');
  },
  columns: [
    'idx',
    'delay',
    'hum_in',
    'temp_in',
    'hum_out',
    'temp_out',
    'abs_pressure',
    'wind_ave',
    'wind_gust',
    'wind_dir',
    'rain',
    'status',
    'illuminance',
    'uv',
  ]
});

// Parse the 'daily' storage
//
// Example file name: daily/2014/2014-12-01.txt
//
datasets.daily = pywwsReader({
  name: 'daily',
  getFilename: function (year, month, day) {
    return [
      year,
      [year, month, '01'].join('-')
    ].join('/');
  },
  columns: [
    'idx',
    'start',
    'hum_out_ave',
    'hum_out_min',
    'hum_out_min_t',
    'hum_out_max',
    'hum_out_max_t',
    'temp_out_ave',
    'temp_out_min',
    'temp_out_min_t',
    'temp_out_max',
    'temp_out_max_t',
    'hum_in_ave',
    'hum_in_min',
    'hum_in_min_t',
    'hum_in_max',
    'hum_in_max_t',
    'temp_in_ave',
    'temp_in_min',
    'temp_in_min_t',
    'temp_in_max',
    'temp_in_max_t',
    'abs_pressure_ave',
    'abs_pressure_min',
    'abs_pressure_min_t',
    'abs_pressure_max',
    'abs_pressure_max_t',
    'rel_pressure_ave',
    'rel_pressure_min',
    'rel_pressure_min_t',
    'rel_pressure_max',
    'rel_pressure_max_t',
    'wind_ave',
    'wind_gust',
    'wind_gust_t',
    'wind_dir',
    'rain',
    'illuminance_ave',
    'illuminance_max',
    'illuminance_max_t',
    'uv_ave',
    'uv_max',
    'uv_max_t',
  ]
});

// Parse the 'monthly' storage
//
// Example file name: monthly/2014-01-01.txt
//
datasets.monthly = pywwsReader({
  name: 'monthly',
  getFilename: function (year, month, day) {
    return [year, '01', '01'].join('-');
  },
  columns: [
    'idx',
    'start',
    'hum_out_ave',
    'hum_out_min',
    'hum_out_min_t',
    'hum_out_max',
    'hum_out_max_t',
    'temp_out_ave',
    'temp_out_min_lo',
    'temp_out_min_lo_t',
    'temp_out_min_hi',
    'temp_out_min_hi_t',
    'temp_out_min_ave',
    'temp_out_max_lo',
    'temp_out_max_lo_t',
    'temp_out_max_hi',
    'temp_out_max_hi_t',
    'temp_out_max_ave',
    'hum_in_ave',
    'hum_in_min',
    'hum_in_min_t',
    'hum_in_max',
    'hum_in_max_t',
    'temp_in_ave',
    'temp_in_min_lo',
    'temp_in_min_lo_t',
    'temp_in_min_hi',
    'temp_in_min_hi_t',
    'temp_in_min_ave',
    'temp_in_max_lo',
    'temp_in_max_lo_t',
    'temp_in_max_hi',
    'temp_in_max_hi_t',
    'temp_in_max_ave',
    'abs_pressure_ave',
    'abs_pressure_min',
    'abs_pressure_min_t',
    'abs_pressure_max',
    'abs_pressure_max_t',
    'rel_pressure_ave',
    'rel_pressure_min',
    'rel_pressure_min_t',
    'rel_pressure_max',
    'rel_pressure_max_t',
    'wind_ave',
    'wind_gust',
    'wind_gust_t',
    'wind_dir',
    'rain',
    'rain_days',
    'illuminance_ave',
    'illuminance_max_lo',
    'illuminance_max_lo_t',
    'illuminance_max_hi',
    'illuminance_max_hi_t',
    'illuminance_max_ave',
    'uv_ave',
    'uv_max_lo',
    'uv_max_lo_t',
    'uv_max_hi',
    'uv_max_hi_t',
    'uv_max_ave',
  ]
});

// Parse the 'hourly storage'
//
// Example file name: hourly/2014/2014-12/2014-12-03.txt
//
datasets.hourly = pywwsReader({
  name: 'hourly',
  getFilename: function (year, month, day) {
    return [
      year,
      year + '-' + month,
      [year, month, day].join('-')
    ].join('/');
  },
  columns: [
    'idx',
    'hum_in',
    'temp_in',
    'hum_out',
    'temp_out',
    'abs_pressure',
    'rel_pressure',
    'pressure_trend',
    'wind_ave',
    'wind_gust',
    'wind_dir',
    'rain',
    'illuminance',
    'uv',
  ]
});

// Get data from all storages for a given date range
//
export function getAll(start, end) {
  var keys    = Object.keys(datasets);
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

