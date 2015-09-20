import { getWindChill } from '../lib/utils';

describe('utils.getWindChill', function() {
  it('can\'t compute for temperatures above 10 deg C', function() {
    getWindChill(11, 3).should.be.exactly(11);
  });

  it('can\'t compute for wind speeds below 1.3 m/s', function() {
    getWindChill(5, 1.2).should.be.exactly(5);
  });

  it('always gets values lower than input temperature', function() {
    for (let n = 9; n > -9; n -= 0.1) {
      getWindChill(n, 3).should.be.lessThan(n);
    }
  });
});
