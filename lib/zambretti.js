import betel_cast from '../vendor/betel_cast';

const baro_top = 1050;
const baro_bottom = 950;
const hemisphere = 1; // Northern

export default function zambretti(rel_pressure, wind_dir_str, pressure_before) {
  const now = new Date();
  const month = now.getMonth();
  const pressure_diff = rel_pressure - pressure_before;
  var pressure_trend;

  if (Math.abs(pressure_diff) < 1) {
    pressure_trend = 0;
  }
  else if (pressure_diff) {
    pressure_trend = 1;
  }
  else {
    pressure_trend = 2;
  }

  return betel_cast(rel_pressure, month, wind_dir_str, pressure_trend, hemisphere, baro_top, baro_bottom)[0];
}

