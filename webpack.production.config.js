/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const nib = require('nib');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
  },

  mode: 'production',

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.EnvironmentPlugin({
      HEAD_COMMIT: undefined,
      DEBUG: false,
      NODE_ENV: 'production'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      googleAnalytics:
        '<!-- Global site tag (gtag.js) - Google Analytics -->' + '\n' +
        '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-1224199-17"></script>' + '\n' +
        '<script>' + '\n' +
        '  window.dataLayer = window.dataLayer || [];' + '\n' +
        '  function gtag(){dataLayer.push(arguments);}' + '\n' +
        '  gtag("js", new Date());' + '\n' +
        '  gtag("config", "UA-1224199-17");' + '\n' +
        '</script>' + '\n',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.styl', '.css'],
    modules: ['.', 'node_modules'],
    fallback: {
      fs: false,
      // for markdown-it plugins
      path: require.resolve("path-browserify"),
      util: require.resolve("util"),
      url: require.resolve("url"),
      process: false,
    }
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            includePaths: [path.resolve(__dirname, 'node_modules/zoo-grommet/dist'), path.resolve(__dirname, 'node_modules/zooniverse-react-components/lib/zooniverse-react-components.css')]
          }
        }
      ]
    }, {
      test: /\.styl$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'stylus-loader',
          options: {
            stylusOptions: {
              use: [nib()]
            }
          }
        }
      ]
    }, {
      test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff\d?)$/,
      type: 'asset/resource'
    }, {
      test: /\.(txt|ico)$/,
      type: 'asset/resource',
      generator: {
        filename: '[name][ext]'
      }
    }],
  }
};
