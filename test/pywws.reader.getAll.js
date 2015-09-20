import app from '..';
import { datasets, getAll } from '../lib/pywws';
import should from 'should';

describe('pywws.getAll', function () {
  var d1, d2;

  beforeEach(function () {
    d1 = new Date('2014-12-03');
    d2 = new Date('2014-12-03');
  });

  it ('gets data from all pywws types', function (done) {
    d2 = new Date(d2.setDate(d2.getDate() + 1));
    getAll(d1, d2).then(function (result) {
      result.should.be.an.Object;
      Object.keys(result).should.eql(Object.keys(datasets));
      result.raw.length.should.be.greaterThan(0);
      done();
    });
  });
});

