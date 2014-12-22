var express = require('express');
var app     = express();

// Config it
app.set('pywws_root', process.cwd() + '/' + process.env.PYWWS_ROOT);
app.set('test_mode',  process.env.NODE_ENV === 'test');

// Load internal modules
var routes  = require('./routes')(app);
var pywws   = require('./pywws')(app);

module.exports = (function () {

  return {
    app     : app,
    pywws   : pywws,
    routes  : routes,
  };
}());

