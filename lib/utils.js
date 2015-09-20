import moment from 'moment';

const windDirMap = [
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'N'
];

export function round(num, dec=1) {
  let pow = Math.pow(10, dec);
  return Math.round(num * pow) / pow;
}

export function getDewPoint(temp_out, hum_out) {
  return temp_out - ((100 - hum_out)/5);
}

export function getWindDirStrFromInt(dir) {
  return windDirMap[dir];
};

export function getWindChill(temp_c, wind_ms) {
  if (temp_c >= 10) {
    return temp_c;
  }
  else if (wind_ms < 1.3) {
    return temp_c;
  }
  else {
    let temp_f = celsiusToFahrenheit(temp_c);
    let wind_mph = wind_ms;
    let wind_sfc = Math.round(wind_mph, 0.16);
    let windChill_f = 35.74  + (0.6215 * temp_f) - (35.75 * wind_sfc) + (0.4275 * temp_f * wind_sfc);
    return fahrenheitToCelsius(windChill_f);
  }
};

export function fahrenheitToCelsius(temp_f) {
  return 5 / 9 * (temp_f - 32);
};

export function celsiusToFahrenheit(temp_f) {
  return 5 / 9 * temp_f + 32;
};

export function msToMph(wind_ms) {
  return 2.23694 * wind_ms;
};

export function getDate(dateStr) {
  return moment(dateStr).add(120, 'minutes').locale('sv');
};
