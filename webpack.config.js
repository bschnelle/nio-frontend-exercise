const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');

const webpackConfig = {
  devServer: {
    contentBase: './dist',
    host: config.host,
    port: config.port
  },

  entry: {
    app: [
      './src/index.js'
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};

if (config.production) {
  // add css loader with ExtractTextPlugin
  webpackConfig.module.rules.push({
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract([
      'css?modules&importLoaders=1&minimize',
      'postcss',
      'sass'
    ])
  });
  // add optimizations
  webpackConfig.plugins.push(
    new ExtractTextPlugin('styles-[contenthash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    // create global constants at compile time...
    // this enables the minification step to remove
    // entire environment specific code blocks (React.js)
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
} else {
  // devServer options
  webpackConfig.devServer.debug = true;
  // source maps
  webpackConfig.devtool = 'source-map';
  // add css loader
  webpackConfig.module.rules.push({
    test: /\.(css|scss)$/,
    use: [
      'style',
      'css?modules&sourceMap&importLoaders=1',
      'postcss',
      'sass'
    ]
  });
}

module.exports = webpackConfig;
