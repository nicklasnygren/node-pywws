import { intRange } from '../lib/range';
import should from 'should';

describe('range.int', function () {
  it('returns array of ints', function () {
    var res = intRange(1, 5);
    res.should.be.an.Array;
    res.length.should.be.exactly(5);
    res.forEach(function (num) {
      num.should.be.a.Number;
    });
  });
});

