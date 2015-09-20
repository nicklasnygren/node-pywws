import reader from '../lib/pywws.reader';
import should from 'should';

describe('pywws.getDateContents', function () {
  describe('throws error', function () {
    it('if no date provided', function () {
      (function () {
        reader(
          // No date in here
        );
      }).should.throw();
    });
  });
});

