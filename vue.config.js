const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      //* 參數可以參考: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifest
      new workboxPlugin.InjectManifest({
        swSrc: './src/sw-injectManifest-config.js',
        swDest: 'sw-injectManifest.js',
        exclude: [/.*/], //* 設定 precache 要忽略的檔案 (這裡設 /.*/，代表都不要預緩存)
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, //* 設定預緩存能存取的最大檔案大小 (5MB)
        mode: process.env.NODE_ENV,
      }),
    ],
  },
  chainWebpack: config => {
    config.plugins.delete('preload'); //* 關閉 prefetch 插件
    config.plugins.delete('prefetch'); //* 關閉 prefetch 插件
    config.optimization.minimizer('terser').tap(args => {
      // args[0].terserOptions.compress.drop_console = true;
      args[0].terserOptions.output = {
        comments: false,
      };
      return args;
    });
  },
  pluginOptions: {
    i18n: {
      locale: 'en-us', // The locale of project localization
      fallbackLocale: 'en-us', // The fallback locale of project localization
      localeDir: 'locales', // The directory where store localization messages of project
      enableInSFC: false, // Enable locale messages in Single file components
    },
  },
};
