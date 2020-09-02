module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch'); //* 移除 prefetch 插件
  },
  // css: {
  //   extract: false,
  // },
  // configureWebpack: {
  //   optimization: {
  //     splitChunks: false,
  //   },
  // },

  // configureWebpack: {
  //   optimization: {
  //     splitChunks: {
  //* https://webpack.js.org/plugins/split-chunks-plugin/
  //* https://stackoverflow.com/a/55372086/5134658

  // minChunks: 3,
  // cacheGroups: {
  // commons: {
  //   maxAsyncRequests: 1,
  //   maxInitialRequests: 1,
  // },
  // default: false,
  // //* Custom common chunk
  // bundle: {
  //   name: 'commons',
  //   chunks: 'async',
  //   // minChunks: 1,
  //   // maxInitialRequests: 1,
  //   // maxInitialRequests: 3,
  //   // reuseExistingChunk: false,
  // },
  // //* Customer vendor
  // // vendors: {
  // //   chunks: 'initial',
  // //   name: 'vendors',
  // //   test: 'vendors',
  // // },
  // //* Merge all the CSS into one file
  // styles: {
  //   name: 'styles',
  //   test: /\.s?css$/,
  //   chunks: 'all',
  //   minChunks: 3,
  //   reuseExistingChunk: true,
  //   enforce: true,
  // },
  // },
  // },
  // },
  // },

  // chainWebpack: config => {
  //   config.optimization.minimizer('terser').tap(args => {
  //     // args[0].terserOptions.compress.drop_console = true;
  //     args[0].terserOptions.output = {
  //       comments: false,
  //     };
  //     return args;
  //   });
  // },
  pluginOptions: {
    i18n: {
      locale: 'en-us', // The locale of project localization
      fallbackLocale: 'en-us', // The fallback locale of project localization
      localeDir: 'locales', // The directory where store localization messages of project
      enableInSFC: false, // Enable locale messages in Single file components
    },
  },
};
