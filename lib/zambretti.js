import betel_cast from '../vendor/betel_cast';

const baro_top = 1050;
const baro_bottom = 950;
const hemisphere = 1; // Northern
const trend_diff_threshold = 1;

export default function zambretti(rel_pressure, wind_dir_str, pressure_trend) {
  const now = new Date();
  const month = now.getMonth();

  if (Math.abs(pressure_trend) < trend_diff_threshold) {
    pressure_trend = 0;
  }
  else if (pressure_diff > 0) {
    pressure_trend = 1;
  }
  else {
    pressure_trend = 2;
  }

  return betel_cast(rel_pressure, month, wind_dir_str, pressure_trend, hemisphere, baro_top, baro_bottom)[0];
}

