'use strict';
const webpack = require('webpack');
const config = require('../config');
/**
 * 他就是基于webpack的一个的loader，解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，
 * 再分别把它们交给对应的 Loader 去处理，核心的作用，就是提取，划重点
 */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const depsPlugin = require('extract-dependency-manifest-plugin');
// path模块是node.js中处理路径的核心模块
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
// 将css单独打包成一个文件的插件，它为每个包含css的js文件都创建一个css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteJsonPlugin = require('write-json-webpack-plugin');
// 引入插件
var vConsolePlugin = require('vconsole-webpack-plugin');

// 接收运行参数
const argv = require('yargs').describe('debug', 'debug 环境').argv; // use 'webpack --debug'

const plugins = [];

console.log('Building on *---' + process.env.NODE_ENV + '---* MODE');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js',
  },
  output: {
    // output 目录对应一个绝对路径。
    path: config.build.assetsRoot,
    filename:
      isProduction || isDevelopment
        ? 'js/[name].[contenthash:7].js'
        : 'js/[name].js',
    chunkFilename:
      isProduction || isDevelopment
        ? 'js/[name].[contenthash:7].js'
        : 'js/[name].js',
    publicPath: isProduction
      ? config.build.assetsPublicPath
      : isDevelopment
        ? config.dev.assetsPublicPath
        : config.local.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss', 'less'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: resolve('src'),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: resolve('src'),
      },
      {
        test: /\.js$/,
        use: isProduction
          ? [
              {
                loader: 'cache-loader',
                options: {
                  cacheDirectory: resolve('cache-loader'),
                },
              },
              'babel-loader',
            ]
          : ['babel-loader'],
        exclude: /node_modules/,
        include: resolve('src'),
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
        ],
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]',
        },
      },
      {
        test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: 'img/[name].[hash:4].[ext]',
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:4].[ext]',
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:4].[ext]',
        },
      },
    ],
  },
  // 在配置中添加插件
  plugins: [
    //keep module.id stable when vendor modules does not change
    new depsPlugin(JSON.stringify(require('../package.json').version)),
    new webpack.HashedModuleIdsPlugin(),
    new vConsolePlugin({ enable: !!argv.debug }),
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    // }),
    new VueLoaderPlugin(), // vue loader 15 必须添加plugin
    new WriteJsonPlugin({
      object: {
        version: require('../package.json').version,
      },
      filename: 'version.json',
      pretty: true, // makes file human-readable (default false)
    }),
  ].concat(plugins),
};
