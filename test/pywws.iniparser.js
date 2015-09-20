import * as iniparser from '../lib/pywws.iniparser';
import should from 'should';

describe('pywws.iniparser', function () {
  it('gets status', function (done) {
    iniparser.getStatus().
      then(function (status) {
        status.should.be.an.Object;
        status['clock'].should.be.an.Object;
        status['last update'].should.be.an.Object;
        done();
      });
  });

  it('gets settings', function (done) {
    iniparser.getSettings().
      then(function (settings) {
        settings.should.be.an.Object;
        settings.paths.should.be.an.Object;
        done();
      });
  });
});

