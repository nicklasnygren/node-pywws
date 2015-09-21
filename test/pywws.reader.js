import reader from '../lib/pywws.reader';
import should from 'should';

describe('pywws.reader', function () {
  it('should be callable', function () {
    reader.should.be.a.Function;
  });

  xdescribe('throws error', function () {
    it('if called without descriptor', function () {
      (function () {
        reader();
      }).should.throw();
    });
    it('if called without name', function () {
      (function () {
        reader({
          // no name here
        });
      }).should.throw();
    });
    it('if called without filename getter', function () {
      (function () {
        reader({
          name: 'raw',
          // no filename getter here
        });
      }).should.throw();
    });
  });

});

