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
  
  ]
});

describe('pywws.getCSV', function () {
  var d1, d2, res, filenames;

  beforeEach(function () {
    d1 = new Date('2014-12-03');
    d2 = new Date('2014-12-03');
  });

  it ('gets csv data', function (done) {
    filenames = module.getFilenameRange(d1, d2);
    res = module.getCSV(filenames[0]).
      then(function (data) {
        data.should.be.an.Array;
        data.length.should.be.greaterThan(0);
        done();
      });
  });
});

