import path from 'path';
import express from 'express';
import setupRoutes from './routes';
import compression from 'compression';

const root = process.env.PYWWS_ROOT || 'pywws-data';
GLOBAL.PYWWS_ROOT = path.resolve(root);

// FIXME: Global app? Bad idea? Antipattern?
const app = express();
app.set('pywws_root', PYWWS_ROOT);

// Serve assets and compress of in production mode
app.use(express.static('build'));
if (__PRODUCTION__) {
  app.use(compression());
}

setupRoutes(app);

export default app;

// Run the server if not in test mode. Port defaults to 80.
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 80);
}

