import { dateRange } from '../lib/range';
import should from 'should';

describe('range.date', function () {
  var d1, d2;

  beforeEach(function () {
    d1 = new Date();
    d2 = new Date(d1*1);
  });

  it('returns array of strings', function () {
    d2.setDate(d2.getDate() + 1);
    var res = dateRange(d1, d2);
    res.should.be.an.Array;
    res.length.should.be.exactly(2);
    res.forEach(function (date) {
      date.should.match(/\d{4}-\d{2}-\d{2}/);
    });
  });

  it('returns dates between and including start and end dates', function () {
    d2.setDate(d2.getDate() + 4);
    var res = dateRange(d1, d2);
    var min = d1.setDate(d1.getDate()-1)*1;
    var max = d2.setDate(d2.getDate()+1)*1;

    res.should.be.an.Array;
    res.length.should.be.exactly(5);
    res.forEach(function (date) {
      (new Date(date)*1).should.be.below(max);
      (new Date(date)*1).should.be.above(min);
    });
  });

  it('requires both start and end arguments to be dates', function () {
    (function () {
      dateRange(d1);
    }).should.throw();
    (function () {
      dateRange(null, d2);
    }).should.throw();
  });
});

