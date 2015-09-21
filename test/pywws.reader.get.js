import app from '..';
import reader from '../lib/pywws.reader';
import should from 'should';

var module = reader({
  name: 'raw',
  getFilename: function (year, month, day) {
    return [
      year,
      year + '-' + month,
      [year, month, day].join('-')
    ].join('/');
  },
  columns: [
    'col_one',
    'col_two',
    'col_three'
  ]
});

describe('pywws.get', function () {
  var d1, d2, res;

  beforeEach(function () {
    d1 = new Date('2014-12-03');
    d2 = new Date('2014-12-03');
  });

  afterEach(function () {
    res.should.be.an.Object;
  });

  it ('gets csv data', function (done) {
    d2 = new Date(d2.setDate(d2.getDate() + 1));
    res = module.get(d1, d2).
      then(function (data) {
        should.exist(data[0].col_one);
        should.exist(data[0].col_two);
        should.exist(data[0].col_three);
        data.should.be.an.Array;
        data.length.should.be.greaterThan(0)
        res = data;
        done();
      });
  });

  it('can specify what columns to get', function(done) {
    d2 = new Date(d2.setDate(d2.getDate() + 1));
    res = module.get(d1, d2, ['col_two']).
      then(function (data) {
        should.not.exist(data[0].col_one);
        should.exist(data[0].col_two);
        should.not.exist(data[0].col_three);
        data.length.should.be.greaterThan(0)
        res = data;
        done();
      });
  });
});

