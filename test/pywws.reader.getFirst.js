var async     = require('async');
var should    = require('should');
var app       = require('..').app;
var pywws     = require('..').pywws;

describe('pywws.getFirst:', function () {
  async.each(Object.keys(pywws.datasets), function (key, callback) {
    var dataset = pywws.datasets[key];

    it(key + ' gets first piece of data ever', function (done) {
      dataset.getFirst().
        then(function (data) {
        data.should.be.an.Object;
        done();
      });
    });

    callback();
  });
});

