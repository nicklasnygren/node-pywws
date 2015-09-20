import { round } from '../lib/utils';

describe('utils.round', function() {
  it('defaults to 1 decimal place', function() {
    round(10.66).should.be.exactly(10.7);
  });

  it('takes number of decimal places as second arg', function() {
    round(10.666, 2).should.be.exactly(10.67);
    round(10.666, 0).should.be.exactly(11);
  });
});

