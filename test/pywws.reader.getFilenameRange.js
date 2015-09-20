import reader from '../lib/pywws.reader';
import should from 'should';

describe('pywws.getFilenameRange', function () {
  var d1, d2, res;

  beforeEach(function () {
    d1 = new Date();
    d2 = new Date();
  });

  afterEach(function () {
    res.should.be.an.Array;
    res[0].should.be.a.String;
  });

  it('returns array of date strings ending with ".txt"', function () {
    var method = reader({
      name: 'raw',
      getFilename: function (year, month, day) {
        return Array.prototype.join.call(arguments, '-');
      }
    }).getFilenameRange;
    d1 = d1.setDate((new Date()).getDate() + 1);
    d2 = d2.setDate((new Date()).getDate() + 2);
    res = method(d1, d2);
    (/\d{4}-\d{2}-\d{2}/.test(res[0])).should.be.ok;
    res[0].indexOf('.txt').should.be.truthy;
  });

  it('returns uniques from pywwsDescriptor.getFilename', function () {
    var method = reader({
      name: 'monthly',
      getFilename: function (year, month, day) {
        return [
          year,
          [year, '01', '01'].join('-')
        ].join('/');
      }
    }).getFilenameRange;
    d2 = d2.setDate((new Date()).getDate() + 1);
    res = method(d1, d2);
    res.length.should.be.exactly(1);
  });

  it('returns uniques from pywwsDescriptor.getFilename', function () {
    var method = reader({
      name: 'hourly',
      getFilename: function (year, month, day) {
        return [
          year,
          year + '-' + month,
          [year, month, day].join('-')
        ].join('/');
      }
    }).getFilenameRange;
    d2 = d2.setDate((new Date()).getDate() + 6);
    res = method(d1, d2);
    res.length.should.be.exactly(7);
  });
});

