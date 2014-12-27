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

describe('pywws.get', function () {
  var d1, d2, res, filenames;

  beforeEach(function () {
    d1 = new Date('2014-12-03');
    d2 = new Date('2014-12-03');
  });

  afterEach(function () {
    res.should.be.an.Object;
  });

  it ('gets csv data', function (done) {
    d2 = new Date(d2.setDate(d2.getDate() + 1));
    filenames = module.getFilenameRange(d1, d2);
    res = module.get(d1, d2).
      then(function (data) {
        data.should.be.an.Array;
        data.length.should.be.greaterThan(0)
        res = data;
        done();
      });
  });
});

