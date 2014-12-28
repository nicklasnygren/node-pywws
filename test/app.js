var app       = require('..').app;
var assert    = require('./support/assert');
var async     = require('async');
var pywws     = require('..').pywws;
var request   = require('supertest');
var routes    = require('..').routes;
var should    = require('should');

describe('API:', function () {
  it('should have set a pywws root', function () {
    app.get('pywws_root').should.be.a.String.and.not.be.empty;
  });

  it('should 404 on root request', function (done) {
    request(app).
      get('/').
      expect(404, done);
  });

  it('should get data from all datasets', function (done) {
    var d1 = new Date('2014-12-03').getTime();
    var d2 = new Date('2014-12-04').getTime();

    request(app).
      get('/all/' + d1 + '/' + d2).
      expect(200, function (err, response) {
        response.body.data.should.be.an.Object;
        response.body.data.should.not.be.an.Array;
        Object.keys(response.body.data).should.eql(Object.keys(pywws.datasets));
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

    async.each(Object.keys(pywws.datasets), function (method, callback) {
      it(method + ' should get data range', function (done) {
        request(app).
          get('/' + method + '/' + d1 + '/' + d2).
          expect(200, assert.multiItemResponse(done));
      });

      it(method + ' should get single data point', function (done) {
        request(app).
          get('/' + method + '/' + d1).
          expect(200, assert.singleItemResponse(done));
      });

      callback();
    });
  });
});

