import request from 'superagent';

const { get } = request;
const BASE_URL = 'http://localhost:7777';

export function query(endpoint, options={}) {
  const {method='GET', columns} = options;
  let columnsStr = '';

  if (method === 'GET' && columns) {
    columnsStr = '?columns=' + columns.join(',');
  }

  return new Promise((resolve, reject) => {
    get(BASE_URL + '/api/' + endpoint + columnsStr, {method})
    .end((err, res) => {
      resolve(res.body.data);
    });
  })
};
