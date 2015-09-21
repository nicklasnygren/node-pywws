import request from 'superagent';

const { get } = request;
const BASE_URL = 'http://localhost:7777';

export function query(endpoint, options={}) {
  let {method='GET'} = options;

  return new Promise((resolve, reject) => {
    get(BASE_URL + '/api/' + endpoint, {method})
    .end((err, res) => {
      resolve(res.body.data);
    });
  })
};
