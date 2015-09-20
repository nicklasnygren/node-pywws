import app from '..';
import async from 'async';
import should from 'should';
import { datasets } from '../lib/pywws';

describe('API:', function () {
  it('should have set a pywws root', function () {
    app.get('pywws_root').should.be.a.String.and.not.be.empty;
  });

  it('should 200 on root request', function (done) {
    request(app)
    .get('/')
    .expect(200, (res) => {
      done();
    });
  });

  it('should get data from all datasets', function (done) {
    var d1 = new Date('2014-12-03').getTime();
    var d2 = new Date('2014-12-04').getTime();

    request(app).
      get('/api/all/' + d1 + '/' + d2).
      expect(200, function (err, response) {
        response.body.data.should.be.an.Object;
        response.body.data.should.not.be.an.Array;
        Object.keys(response.body.data).should.eql(Object.keys(datasets));
        done();
      });
  });

  // Test all access types for all datasets
  describe('dataset', function () {
    var d1, d2;

    beforeEach(function () {
      d1 = new Date('2014-12-03').getTime();
      d2 = new Date('2014-12-04').getTime();
    });

    async.each(Object.keys(datasets), function (method, callback) {
      it(method + ' should get data range', function (done) {
        request(app).
          get('/api/' + method + '/' + d1 + '/' + d2).
          expect(200, assert.multiItemResponse(done));
      });

      it(method + ' should get single data point', function (done) {
        request(app).
          get('/api/' + method + '/' + d1).
          expect(200, assert.singleItemResponse(done));
      });

      it(method + ' should get first single data point', function (done) {
        request(app).
          get('/api/' + method + '/first').
          expect(200, assert.singleItemResponse(done));
      });

      it(method + ' should get latest single data point', function (done) {
        request(app).
          get('/api/' + method + '/latest').
          expect(200, assert.singleItemResponse(done));
      });

      callback();
    });
  });
});

