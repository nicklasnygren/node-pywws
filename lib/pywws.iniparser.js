import Promise from 'bluebird';

const ini = Promise.promisifyAll(require('iniparser'));

export function getStatus() {
  return ini.parseAsync(PYWWS_ROOT + '/status.ini');
};

export function getSettings() {
  return ini.parseAsync(PYWWS_ROOT + '/weather.ini');
};

