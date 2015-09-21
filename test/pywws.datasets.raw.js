import { PywwsRawDataset } from '../lib/datasets';

const dataset = new PywwsRawDataset();

describe('Raw dataset', function() {
  it('can be constructed', function() {
    dataset.should.be.truthy;
  });

  it('has methods for getting data', function() {
    dataset.get.should.be.a.Function;
  });
});

