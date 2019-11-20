'use strict';

/**
 * 以下为可配置参数，请仔细阅读，若对参数不理解，请慎改！
 * 参数详情可参照 http://vortex.zj.chinamobile.com/vortex-cli-doc/pei-zhi/webpack-xiang-guan.html
 */

const path = require('path');
const version = require('../package').version;

module.exports = {
  // 本地开发参数配置
  local: {
    /**
     * 不需要被 webpack 编译的静态资源文件存放目录，
     * 根目录下有 static 文件夹，可以存放一些无需编译的静态资源，
     * webpack 会将这些资源原封不动的拷贝到 staticAssetsDirectory 所定义的这个目录下。
     * demo
     * staticAssetsDirectory: 'assets',
     * static 目录的文件在构建过程中，会被直接拷贝到 assets 这个目录下
     */
    staticAssetsDirectory: 'static',
    /**
     * !!! 如果是走一体化平台构建的项目请勿改该配置
     * 部署应用包时的基本 URL。
     * 用法和 webpack 本身的output.publicPath一致，webpack 会在静态文件路径前面添加 publicPath 的值，
     * 当我们把资源放到CDN上的时候，把 publicPath 的值设为 CDN 的值就可以了。
     * assetsPublicPath 的作用是便于访问打包后的静态资源
     * demo
     * assetsPublicPath: '/app/'
     * 打包出来的静态资源路径是 /app/*.js
     */
    assetsPublicPath: "/H5-Plaint-1120/", // 相对文件路径

    /**
     * !!! 这个配置只有在本地开发才有意义，
     * 本地开发使用 webpack-dev-server ，会起一个服务器，从而实现 proxy
     * demo
     * proxyTable: {
     *  '/myapp/myappapi/': {
     *    target: 'http://20.26.38.154:30058/', //测试环境
     *    changeOrigin: true,
     *  },
     * },
     */
    proxyTable: {},
    /**
     * !!! 如果你是移动端开发，想在手机上访问本地电脑，那么请设置 host 为 0.0.0.0，
     * 你在手机端就可以用电脑IP地址访问了。
     */
    host: 'localhost', // 为了方便别人访问，请设置0.0.0.0
    port: '8000', // 端口号
    autoOpenBrowser: true, // 是否自动打开浏览器
    errorOverlay: true, // 浏览器错误提示遮罩层
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    devtool: 'eval-source-map', // Source Maps
    disableHostCheck: false, // 当设置为true时，该选项绕过主机检查。不建议这样做，因为不检查主机的应用程序容易受到DNS重新绑定攻击。
  },
  // 测试环境参数配置
  dev: {
    // Paths
    staticAssetsDirectory: 'static',
    /**
     * !!! 如果是走一体化平台构建的项目请勿改该配置
     */
    assetsPublicPath: `http://test.fsp-cdn.vortex.zj.chinamobile.com:8000/H5-Plaint-1120/${version}/`, // 相对文件路径

    devtool: 'eval-source-map', // Source Maps 已按最有方式配置，勿改
  },
  // 生产环境参数配置
  build: {
    // Paths
    staticAssetsDirectory: 'static',
    /**
     * webpack 编译后的静态资源 (js、css、img、fonts) 存放路径，默认为 dist。
     */
    assetsRoot: path.resolve(__dirname, '../dist'),
    /**
     * !!! 如果是走一体化平台构建的项目请勿改该配置
     */
    assetsPublicPath:`http://fsp-cdn.vortex.zj.chinamobile.com/H5-Plaint-1120/${version}/`, // 相对文件路径

    // 生产环境的souce map
    // https://webpack.js.org/co    // Paths
    // 生产环境下source map devtool 不做配置
    devtool: 'source-map', // 已按最有方式配置，勿改
    // 生产环境下souce map的内网位置，private sourceMap
    sourcePath: '',
  },
};
