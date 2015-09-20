import pywws from '../pywws';
import homeRouteHandler from './home';
import allowCors from './cors';
import { datasets } from '../pywws';

export default function setupRoutes(app) {
  app.use(allowCors);
  app.get('/', homeRouteHandler);
  
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
  
    if (Object.keys(datasets).indexOf(type) === -1) return next();
    if (typeof req.params.start !== 'string') return next();
  
    res.status(200);
    datasets[type].get(start, end).
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
  
    if (Object.keys(datasets).indexOf(type) === -1) return next();
  
    res.status(200);
    datasets[type].getFirst().
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
  
    if (Object.keys(datasets).indexOf(type) === -1) return next();
  
    res.status(200);
    datasets[type].getLatest().
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
  
    if (Object.keys(datasets).indexOf(type) === -1) return next();
    if (typeof req.params.date !== 'string') return next();
  
    res.status(200);
    datasets[type].getOne(date).
      then((data) => {
      res.
        json({
        data: data
      }).
        end();
    });
  });
}

