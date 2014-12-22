var fs = require('fs');

module.exports = function (app) {

  // Root request
  app.get('/raw/:start/to/:end', function (req, res) {
    var start = new Date(req.params.start);
    var end   = new Date(req.params.end);
    var responseJSON;

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

