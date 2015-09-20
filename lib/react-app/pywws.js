//import {BASE_URL} from '../pywws.config';
import request from 'superagent';

const { get } = request;

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

export function getDewPoint(temp_out, hum_out) {
  return temp_out - ((100 - hum_out)/5);
}

export function getWindDirStrFromInt(dir) {
  return windDirMap[dir];
};

export function query(endpoint, options={}) {
  let {method='GET'} = options;

  return new Promise((resolve, reject) => {
    get(BASE_URL + '/api/' + endpoint, {method})
    .end((err, res) => {
      resolve(res.body.data);
    });
  })
};

