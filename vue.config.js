const workboxPlugin = require('workbox-webpack-plugin');

let plugins = [];

//* 目前於開發環境時，引入 workbox-webpack-plugin，每當重新編譯，都會有重複使用的警告(不影響功能，但會影響開發重整)
//* 參數可以參考: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifest
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new workboxPlugin.InjectManifest({
      mode: process.env.NODE_ENV,
      swSrc: './src/sw-injectManifest-config.js',
      swDest: 'sw-injectManifest.js',
      exclude: [/.*/], //* 設定 precache 要忽略的檔案 (這裡設 /.*/，代表都不要預緩存)
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, //* 設定預緩存能存取的最大檔案大小 (5MB)
    })
  );
}

module.exports = {
  configureWebpack: {
    plugins,
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
