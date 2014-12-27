var should    = require('should');
var app       = require('..').app;
var module    = require('../lib/pywws.reader')(app)({
  name: 'raw',
  getFilename: function (year, month, day) {
    return [
      year,
      year + '-' + month,
      [year, month, day].join('-')
    ].join('/');
  },
  columns: [
    // 
  ]
});

describe('pywws.getOne', function () {
  var d1;

  beforeEach(function () {
    d1 = new Date('2014-12-03');
  });

  it('gets first piece of data BEFORE date', function (done) {
    module.getOne(d1).
      then(function (data) {
        data.should.be.an.Array;
        data.length.should.be.greaterThan(0)
        done();
      });
  });

  it('gets first piece of data AFTER date', function (done) {
    module.getOne(d1, true).
      then(function (data) {
        data.should.be.an.Array;
        data.length.should.be.greaterThan(0)
        done();
      });
  });

});

