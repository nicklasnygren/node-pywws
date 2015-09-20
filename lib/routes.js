import jade from 'jade';
import React from 'react';
import {IndexPage} from './react-app/app';

const indexFactory = React.createFactory(IndexPage);
const indexTemplate = jade.compileFile(__dirname + '/jade-views/index.jade');

module.exports = (app) => {
  const pywws = require('./pywws')(app);
  const { raw, hourly, daily, monthly } = pywws.datasets;

  var allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  }

  app.use(allowCrossDomain);

  app.get('/', (req, res, next) => {
    Promise.all([
      raw.getLatest(),
      hourly.getLatest(),
      daily.getLatest(),
      monthly.getLatest()
    ])
    .then(([raw, hourly, daily, monthly]) => {
      let initialData = { raw, hourly, daily, monthly };
      let reactHtml = React.renderToString(<IndexPage initialData={initialData}/>);
      let result = indexTemplate({ viewContent: reactHtml, initialData: JSON.stringify(initialData) });
      res.send(result);
    });
  });

  // Root request
  app.get('/api/all/:start/:end', (req, res, next) => {
    var start = req.params.start;
    var end   = req.params.end || (new Date()).toString();
    var responseJSON;

    if (typeof req.params.start !== 'string') return next();

    res.status(200);
    pywws.getAll(start, end).
      then((data) => {
        res.
          json({
            data: data
          }).
          end();
      });
  });

  app.get('/api/:type/:start/:end', (req, res, next) => {
    var type  = req.params.type;
    var start = req.params.start;
    var end   = req.params.end || (new Date()).toString();
    var responseJSON;

    if (Object.keys(pywws.datasets).indexOf(type) === -1) return next();
    if (typeof req.params.start !== 'string') return next();

    res.status(200);
    pywws.datasets[type].get(start, end).
      then((data) => {
        res.
          json({
            data: data
          }).
          end();
      });
  });

  app.get('/api/:type/first', (req, res, next) => {
    var type  = req.params.type;
    var responseJSON;

    if (Object.keys(pywws.datasets).indexOf(type) === -1) return next();

    res.status(200);
    pywws.datasets[type].getFirst().
      then((data) => {
        res.
          json({
            data: data
          }).
          end();
      });
  });

  app.get('/api/:type/latest', (req, res, next) => {
    var type  = req.params.type;
    var responseJSON;

    if (Object.keys(pywws.datasets).indexOf(type) === -1) return next();

    res.status(200);
    pywws.datasets[type].getLatest().
      then((data) => {
        res.
          json({
            data: data
          }).
          end();
      });
  });

  app.get('/api/:type/:date', (req, res, next) => {
    var type  = req.params.type;
    var date  = req.params.date;
    var responseJSON;

    if (Object.keys(pywws.datasets).indexOf(type) === -1) return next();
    if (typeof req.params.date !== 'string') return next();

    res.status(200);
    pywws.datasets[type].getOne(date).
      then((data) => {
        res.
          json({
            data: data
          }).
          end();
      });
  });
};

