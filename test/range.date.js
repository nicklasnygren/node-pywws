var range = require('../lib/range');

describe('range.int', function () {
  it('returns array of ints', function () {
    var res = range.int(1, 5);
    res.should.be.an.Array;
    res.length.should.be.exactly(5);
    res.forEach(function (num) {
      num.should.be.a.Number;
    });
  });
});

