var express = require('express');
var app     = express();

// Config it
app.set('pywws_root', process.cwd() + '/' + process.env.PYWWS_ROOT);

// Load internal modules
var routes  = require('./routes')(app);
var pywws   = require('./pywws')(app);

// Run the server if not in test mode. Port defaults to 80.
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 80);
}

module.exports = (function () {
  return {
    app     : app,
    pywws   : pywws,
    routes  : routes,
  };
}());

