module.exports = function (app) {
  var pywws = require('./pywws')(app);

  // Root request
  app.get('/:start/:end', function (req, res, next) {
    var start = req.params.start;
    var end   = req.params.end || (new Date()).toString();
    var responseJSON;

    if (typeof req.params.start !== 'string') return next();
    //if (typeof req.params.end   !== 'string') return next();

    res.status(200);
    pywws.getAll(start, end).
      then(function (data) {
        res.
          json({
            data: data
          }).
          end();
      });
  });
};

