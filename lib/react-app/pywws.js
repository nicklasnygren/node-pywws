//import {BASE_URL} from '../pywws.config';
import request from 'superagent';

const { get } = request;

export function query(endpoint, options={}) {
  let {method='GET'} = options;

  return new Promise((resolve, reject) => {
    get(BASE_URL + '/api/' + endpoint, {method})
    .end((err, res) => {
      resolve(res.body.data);
    });
  })
};
