import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      // Stub away some node specific modules
      'fs': path.join(__dirname, 'webpack.stubs.js')
    },
    extensions: ['', '.js', '.jsx', '.index.js', 'index.jsx']
  },
  entry: {
    bundle: ['./lib/react-app/app.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      __WEBPACK__: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: [/\.s(a|c)ss?$/, /\.css$/],
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};

