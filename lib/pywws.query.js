import request from 'superagent';

const { get } = request;
let baseUrl;

if (__PRODUCTION__) {
  baseUrl = '';
} 
else {
  baseUrl = 'http://localhost:' + __PORT__;
}

export function query(endpoint, options={}) {
  const {method='GET', columns} = options;
  let columnsStr = '';

  if (method === 'GET' && columns) {
    columnsStr = '?columns=' + columns.join(',');
  }

  return new Promise((resolve, reject) => {
    get(baseUrl + '/api/' + endpoint + columnsStr, {method})
    .end((err, res) => {
      resolve(res.body.data);
    });
  })
};
