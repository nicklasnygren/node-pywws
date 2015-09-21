import iniparser from 'iniparser';

export function getStatus() {
  return new Promise((resolve, reject) => {
    iniparser.parse(PYWWS_ROOT + '/status.ini', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(data)
      }
    });
  })
};

export function getSettings() {
  return new Promise((resolve, reject) => {
    iniparser.parse(PYWWS_ROOT + '/weather.ini', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(data)
      }
    });
  })
};

