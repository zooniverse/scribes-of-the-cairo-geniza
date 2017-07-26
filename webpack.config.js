const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const nib = require('nib');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/src/'),
    hot: true,
    inline: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    port: 3000 // Change this for your project
  },
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.jsx')
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      gtm: ''
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('staging')
    }),
    new DashboardPlugin({ port: 3001 })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    modules: ['.', 'node_modules']
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: [
        'babel-loader'
        // 'eslint-loader' uncomment if you want to use eslint while compiling
      ]
    }, {
      test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff\d?)$/,
      use: 'file-loader'
    }, {
      test: /\.styl$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'stylus-loader',
        options: {
          use: [nib()]
        }
      }]
    }]
  },
  node: {
    fs: 'empty' // workaround for the webpack shimming not working with certain dependencies
  }
};
