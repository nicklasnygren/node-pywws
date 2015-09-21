import path from 'path';
import express from 'express';
import setupRoutes from './routes';
import compression from 'compression';
import { allowCors } from './routes/cors';

GLOBAL.PYWWS_ROOT = path.resolve(process.env.PYWWS_ROOT);

// FIXME: Global app? Bad idea? Antipattern?
const app = express();
app.set('pywws_root', PYWWS_ROOT);
app.use(allowCors);
app.use(compression());
app.use(express.static('assets'));
setupRoutes(app);

export default app;

// Run the server if not in test mode. Port defaults to 80.
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 80);
}

