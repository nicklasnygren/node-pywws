var should      = require('should');
var app         = require('..').app;
var pywwsMethod = require('../lib/pywws.reader')(app)({
  name: 'raw',
  getFilename: Function.prototype
}).getDateRange;

describe('pywws.getDateRange', function () {
    var d1, d2, res;

    beforeEach(function () {
      d1 = new Date();
      d2 = new Date();
    });

    it('returns array', function () {
      d1 = d1.setDate((new Date()).getDate() + 1);
      d2 = d2.setDate((new Date()).getDate() + 2);
      res = pywwsMethod(d1, d2);
      res.should.be.an.Array;
    });

    it('gets all dates in date span', function () {
      d2 = d2.setDate((new Date()).getDate() + 6);
      res = pywwsMethod(d1, d2);
      res.length.should.be.exactly(7);
    });
});

