/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const nib = require('nib');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
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
    new ExtractTextPlugin({
      filename: '[name]-[hash].min.css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
      },
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
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: {
          loader: 'css-loader',
        },
      }),
    }, {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            includePaths: [path.resolve(__dirname, 'node_modules/zoo-grommet/dist'), path.resolve(__dirname, 'node_modules/zooniverse-react-components/lib/zooniverse-react-components.css')]
          }
        }, {
          loader: 'stylus-loader',
          options: {
            use: [nib()],
          },
        }],
      }),
    }, {
      test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff\d?)$/,
      use: [{
        loader: 'file-loader',
      }, {
        loader: 'image-webpack-loader',
      }],
    }, {
      test: /\.(ico|txt\d?)$/,
      loader: 'file-loader?name=[name].[ext]',

    }],
  },
  node: {
    fs: 'empty' // workaround for the webpack shimming not working with certain dependencies
  }
};
