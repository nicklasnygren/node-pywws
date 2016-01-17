import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';

global.__PORT__ = process.env.PORT;
global.__PRODUCTION__ = process.env.NODE_ENV === 'production';
global.__WEBPACK__ = false;
global.REACT_APP_ROOT = path.resolve('../react-pywws');

module.exports = require('./lib/nodepywws');

//if (!__PRODUCTION__) {
//  webpackConfig.entry.bundle.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
//  const compiler = webpack(webpackConfig);
//  const server = new webpackDevServer(compiler, {
//    hot: true,
//    publicPath: 'http://localhost:8080/',
//  });
//  server.listen(8080);
//}

