import Promise from 'bluebird';
import iniparser from 'iniparser';

const { parseAsync: parseIni } = Promise.promisifyAll(iniparser);

export function getStatus() {
  return parseIni(PYWWS_ROOT + '/status.ini').then((data) => {
    return data;
  });
};

export function getSettings() {
  return parseIni(PYWWS_ROOT + '/weather.ini');
};

