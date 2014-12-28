var app     = require('..').app;
var pywws   = require('..').pywws;
var routes  = require('..').routes;
var request = require('supertest');
var should  = require('should');
var async   = require('async');

var assertMultiItemResponse = function (expectEmpty) {
  var doneCallback = arguments[arguments.length-1];

  return function (err, response) {
    response.body.data.should.be.an.Array;
    if (!expectEmpty) {
      response.body.data[0].idx.should.be.ok;
      response.body.data.length.should.be.greaterThan(0);
    }

    if (doneCallback) doneCallback();
  };
};

var assertSingleItemResponse = function () {
  var doneCallback = arguments[arguments.length-1];

  return function (err, response) {
    response.body.data.should.be.an.Object;
    response.body.data.idx.should.be.ok;
    response.body.data.should.not.be.an.Array;

    if (doneCallback) doneCallback();
  };
};

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
          expect(200, assertMultiItemResponse(done));
      });

      it(method + ' should get single data point', function (done) {
        request(app).
          get('/' + method + '/' + d1).
          expect(200, assertSingleItemResponse(done));
      });

      callback();
    });
  });
});

