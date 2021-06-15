// const workboxPlugin = require('workbox-webpack-plugin');
// const path = require('path');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const proxy = {
  '/rch3api0member': {
    target: 'http://api.caza7.re888show.com',
    ws: true,
    changeOrigin: true,
    pathRewrite: {
      '^/rch3api0member': '/api', // rewrite path
    },
  },
};

module.exports = {
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //* workbox
    // config.plugins.push(
    //   new workboxPlugin.InjectManifest({
    //     mode: process.env.NODE_ENV,
    //     swSrc: './src/sw-injectManifest-config.js',
    //     swDest: 'sw-injectManifest.js',
    //     exclude: [/.*/], //* 設定 precache 要忽略的檔案 (這裡設 /.*/，代表都不要預緩存)
    //     maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, //* 設定預緩存能存取的最大檔案大小 (5MB)
    //   })
    // );

    //* prerender-spa-plugin
    // config.plugins.push(
    //   new PrerenderSPAPlugin({
    //     staticDir: path.join(__dirname, 'dist'),
    //     routes: ['/'],
    //     renderer: new Renderer({
    //       // renderAfterElementExists: '.main',
    //       renderAfterDocumentEvent: 'custom-render-trigger',
    //       maxConcurrentRoutes: 1,
    //       headless: true,
    //     }),
    //     server: { proxy },
    //   })
    // );
    // }

    //* compression-webpack-plugin
    config.plugins.push(new CompressionWebpackPlugin());
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch'); //* 關閉 prefetch 插件
    // config.plugins.delete('preload'); //* 關閉 preload 插件

    // config.plugin('preload').tap(args => {
    //   args[0].include = 'allChunks';
    //   return args;
    // });

    config.optimization.minimizer('terser').tap(args => {
      //* 清除 console.log
      if (process.env.NODE_ENV === 'production') {
        args[0].terserOptions.compress.drop_console = true;
      }
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false,
      };
      return args;
    });

    // console.log(config.optimization.get('splitChunks'));

    // config.optimization
    //   .minimize(true)
    //   .namedModules(true)
    //   .namedChunks(true)
    //   .removeAvailableModules(true)
    //   .flagIncludedChunks(true)
    //   .occurrenceOrder(false)
    //   .usedExports(true)
    //   .concatenateModules(true)
    //   .sideEffects(false);
  },
  devServer: { proxy },
  pluginOptions: {
    i18n: {
      locale: 'en-us', // The locale of project localization
      fallbackLocale: 'en-us', // The fallback locale of project localization
      localeDir: 'locales', // The directory where store localization messages of project
      enableInSFC: false, // Enable locale messages in Single file components
    },
  },
};
