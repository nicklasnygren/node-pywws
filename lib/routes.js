module.exports = function (app) {
  var pywws = require('./pywws')(app);

  // Root request
  app.get('/all/:start/:end', function (req, res, next) {
    var start = req.params.start;
    var end   = req.params.end || (new Date()).toString();
    var responseJSON;

    if (typeof req.params.start !== 'string') return next();

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

  app.get('/:type/:start/:end', function (req, res, next) {
    var type  = req.params.type;
    var start = req.params.start;
    var end   = req.params.end || (new Date()).toString();
    var responseJSON;

    if (Object.keys(pywws.datasets).indexOf(type) === -1) return next();
    if (typeof req.params.start !== 'string') return next();

    res.status(200);
    pywws.datasets[type].get(start, end).
      then(function (data) {
        res.
          json({
            data: data
          }).
          end();
      });
  });

  app.get('/:type/:date', function (req, res, next) {
    var type  = req.params.type;
    var date  = req.params.date;
    var responseJSON;

    if (Object.keys(pywws.datasets).indexOf(type) === -1) return next();
    if (typeof req.params.date !== 'string') return next();

    res.status(200);
    pywws.datasets[type].getOne(date).
      then(function (data) {
        res.
          json({
            data: data
          }).
          end();
      });
  });
};

