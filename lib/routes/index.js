import pywws from '../pywws';
import homeRouteHandler from './home';
import { allowCors } from './cors';
import { datasets, getAll } from '../pywws';

export default function setupRoutes(app) {
  app.use(allowCors);
  app.get('/', homeRouteHandler);
  
  // Root request
  app.get('/api/all/:start/:end', (req, res, next) => {
    let start = req.params.start;
    let end = req.params.end || (new Date()).toString();
    let columns = req.query.columns;
  
    if (typeof req.params.start !== 'string') return next();
  
    res.status(200);
    getAll(start, end, columns).then((data) => res.json({ data }).end());
  });
  
  app.get('/api/:type/:start/:end', (req, res, next) => {
    let type = req.params.type;
    let start = req.params.start;
    let end = req.params.end || (new Date()).toString();
    let columns = req.query.columns;
  
    if (Object.keys(datasets).indexOf(type) === -1) return next();
    if (typeof req.params.start !== 'string') return next();
  
    res.status(200);
    datasets[type].get(start, end, columns).then((data) => res.json({ data }).end());
  });
  
  app.get('/api/:type/first', (req, res, next) => {
    let type = req.params.type;
    let columns = req.query.columns;
  
    if (Object.keys(datasets).indexOf(type) === -1) return next();
  
    res.status(200);
    datasets[type].getFirst(columns).
      then((data) => {
      res.
        json({
        data: data
      }).
        end();
    });
  });
  
  app.get('/api/:type/latest', (req, res, next) => {
    let type = req.params.type;
    let columns = req.query.columns;
  
    if (Object.keys(datasets).indexOf(type) === -1) return next();
  
    res.status(200);
    datasets[type].getLatest(columns).
      then((data) => {
      res.
        json({
        data: data
      }).
        end();
    });
  });
  
  app.get('/api/:type/:date', (req, res, next) => {
    let type = req.params.type;
    let date = req.params.date;
    let columns = req.query.columns;
  
    if (Object.keys(datasets).indexOf(type) === -1) return next();
    if (typeof req.params.date !== 'string') return next();
  
    res.status(200);
    datasets[type].getOne(date, columns).
      then((data) => {
      res.
        json({
        data: data
      }).
        end();
    });
  });
}

