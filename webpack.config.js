const argv = require('yargs').argv;
const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const appConfigQa = require('./config/qa');
const appConfigDev = require('./config/dev');
const appConfigInt = require('./config/int');
const appConfigPreProd = require('./config/preprod');
const appConfigProduction = require('./config/prod');

const ENV = argv.env || 'dev';

function composeConfig(env) {
  if (env === 'qa') {
    return appConfigQa;
  }
  if (env === 'int') {
    return appConfigInt;
  }
  if (env === 'prod') {
    return appConfigProduction;
  }
  if (env === 'preprod') {
    return appConfigPreProd;
  }
  return appConfigDev;
}

module.exports = (env) => {
  const production = (env === 'prod' || env === 'preprod' || env === 'int' || env === 'qa' || env === 'dev');
  const test = env === 'test';
  const plugins = [];

  if (production) {
    plugins.push(new HtmlWebpackPlugin({ template: '../index.html' }));
  }

  const chooseLoader = loader => (test ? 'null-loader' : loader);

  return {
    entry: [
      resolve(__dirname, 'src/index')
    ],
    resolve: {
      alias: {
        origin: resolve(__dirname, 'src')
      }
    },
    target: 'web',
    output: {
      path: resolve(__dirname, `dist-${ENV}`),
      publicPath: production ? './' : '/',
      filename: 'bundle.js'
    },
    devServer: {
      publicPath: '/',
      historyApiFallback: true
    },
    context: resolve(__dirname, 'src'),
    devtool: production ? 'eval'/*'source-map'*/ : 'inline-source-map',
    plugins: plugins.concat([
      new webpack.DefinePlugin({
        __APP_CONFIG__: JSON.stringify(composeConfig(ENV))
      }),
      new ExtractTextPlugin({
        filename: 'bundle.css',
        disable: !production
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            configFile: resolve(__dirname, '.eslintrc')
          }
        }
      })
    ]),
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /(\.css)$/,
          use: chooseLoader(ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }))
        },
        {
          test: /\.scss$/,
          use: chooseLoader(ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader!resolve-url-loader' }))
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: chooseLoader('file')
        },
        {
          test: /\.(woff|woff2)$/,
          use: chooseLoader('url?prefix=font/&limit=5000')
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: chooseLoader('url?limit=10000&mimetype=application/octet-stream')
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: chooseLoader('url?limit=10000&mimetype=image/svg+xml')
        }
      ]
    }
  };
};
