var app     = require('..').app;
var routes  = require('..').routes;
var request = require('supertest');
var should  = require('should');

describe('app', function () {

  it('should have set a pywws root', function () {
    app.get('pywws_root').should.be.a.String.and.not.be.empty;
  });

  it('should 404 on root request', function (done) {
    request(app).
      get('/').
      expect(404, done);
  });

  it('should get raw data', function (done) {
    var d1 = new Date('2014-12-03').getTime();
    var d2 = new Date('2014-12-04').getTime();

    request(app).
      get('/' + d1 + '/' + d2).
      expect(200, done);
  });

  it('should get raw data', function (done) {
    var d1 = new Date('2014-12-03').getTime();
    var d2 = new Date('2014-12-04').getTime();

    request(app).
      get('/' + d1 + '/' + d2).
      expect(200, done);
  });

  //it('has no future dates', function (done) {
  //  var d1, d2, query;

  //  d1 = new Date();
  //  d2 = new Date();
  //  d1 = d1.setDate((new Date()).getDate() + 1);
  //  d2 = d2.setDate((new Date()).getDate() + 2);

  //  query = '/raw/$1/to/$2'.
  //    replace('$1', d1).
  //    replace('$2', d2);

  //  request(app).
  //    get(query).
  //    expect(404, done);
  //});
});

