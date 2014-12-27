var should  = require('should');
var app     = require('..').app;
var pywws   = require('../lib/pywws.reader')(app);

describe('pywws', function () {
  it('should be callable', function () {
    pywws.should.be.a.Function;
  });

  describe('throws error', function () {
    it('if called without descriptor', function () {
      (function () {
        pywws();
      }).should.throw();
    });
    it('if called without name', function () {
      (function () {
        pywws({
          // no name here
        });
      }).should.throw();
    });
    it('if called without filename getter', function () {
      (function () {
        pywws({
          name: 'raw',
          // no filename getter here
        });
      }).should.throw();
    });
  });

});

