import Promise from 'bluebird';
import iniparser from 'iniparser';

const { parseIni } = Promise.promisifyAll(iniparser);

export function getStatus() {
  return parseIni(PYWWS_ROOT + '/status.ini');
};

export function getSettings() {
  return parseIni(PYWWS_ROOT + '/weather.ini');
};

