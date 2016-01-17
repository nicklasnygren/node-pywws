import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const __PRODUCTION__ = process.env.NODE_ENV === 'production';

const plugins = [
  new ExtractTextPlugin('[name].css'),
  new webpack.DefinePlugin({
    __WEBPACK__: true,
    __PRODUCTION__: __PRODUCTION__,
    __PORT__: process.env.PORT
  })
];

let devtool;

if (__PRODUCTION__) {
  devtool = '';
  plugins.push(new webpack.optimize.UglifyJsPlugin({}))
}
else {
  devtool = 'inline-source-map';
}

module.exports = {
  devtool: devtool,
  resolve: {
    alias: {
      // Stub away some node specific modules
      'fs': path.join(__dirname, 'webpack.stubs.js'),
    },
    extensions: ['', '.js', '.jsx', '.index.js', 'index.jsx'],
  },
  entry: {
    bundle: ['./lib/react-app/app.jsx']
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].js',
    publicPath: 'http://localhost:8080/',
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          env: {
            development: {
              plugins:  [['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                }]
              }]]
            }
          }
        },
      },
      {
        test: [/\.s(a|c)ss?$/, /\.css$/],
        exclude: /node_modules/,
        loader: 'style!css!postcss!sass',
      },
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
};

