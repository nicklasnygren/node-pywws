var should    = require('should');
var app       = require('..').app;
var pywwsRes  = require('../lib/pywws.reader')(app);

describe('pywws.getDateContents', function () {
  describe('throws error', function () {
    it('if no date provided', function () {
      (function () {
        pywwsRes(
            // No date in here
          );
      }).should.throw();
    });
  });
});

