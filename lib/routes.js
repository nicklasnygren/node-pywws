module.exports = function (app) {
  var pywws = require('./pywws')(app);

  // Root request
  app.get(':start/:end', function (req, res, next) {
    var start = new Date(req.params.start);
    var end   = new Date(req.params.end);
    var responseJSON;

    if (typeof req.params.start !== 'string') return next();
    if (typeof req.params.end   !== 'string') return next();

    res.
      status(404).
      send();


    // 404 if we don't have a start or end datetime
    //if (!req.params.start || !req.params.end) {
    //  responseJSON = {
    //    message: 'Invalid from or to dates'
    //  };

    //  res.
    //    status(400).
    //    json(responseJSON).
    //    end();

    //  return;
    //}
  });
};

