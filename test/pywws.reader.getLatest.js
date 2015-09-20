import async from 'async';
import { datasets } from '../lib/pywws';
import should from 'should';

describe('pywws.getFirst:', function () {
  async.each(Object.keys(datasets), function (key, callback) {
    var dataset = datasets[key];

    it(key + ' gets latest piece of data', function (done) {
      dataset.getLatest().
        then(function (data) {
        data.should.be.an.Object;
        data.idx.should.be.ok;
        done();
      });
    });

    callback();
  });
});

