import should from 'should';

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

module.exports = {
  multiItemResponse:  assertMultiItemResponse,
  singleItemResponse: assertSingleItemResponse,
};

