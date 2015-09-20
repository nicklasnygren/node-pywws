import async from 'async';
import { datasets } from '../lib/pywws';
import should from 'should';

describe('pywws.getFirst:', function () {
  async.each(Object.keys(datasets), function (key, callback) {
    var dataset = datasets[key];

    it(key + ' gets first piece of data ever', function (done) {
      dataset.getFirst().
        then(function (data) {
        data.should.be.an.Object;
        done();
      });
    });

    callback();
  });
});

