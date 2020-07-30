module.exports = {
  // configureWebpack: {
  //   optimization: {
  //     splitChunks: {
  //       cacheGroups: {
  //         default: false,
  //         // Custom common chunk
  //         bundle: {
  //           name: 'commons',
  //           chunks: 'all',
  //           minChunks: 3,
  //           reuseExistingChunk: false,
  //         },
  //         // Customer vendor
  //         vendors: {
  //           chunks: 'initial',
  //           name: 'vendors',
  //           test: 'vendors',
  //         },
  //         // Merge all the CSS into one file
  //         styles: {
  //           name: 'styles',
  //           test: /\.s?css$/,
  //           chunks: 'all',
  //           minChunks: 3,
  //           reuseExistingChunk: true,
  //           enforce: true,
  //         },
  //       },
  //     },
  //   },
  // },
  pluginOptions: {
    i18n: {
      locale: 'en-us', // The locale of project localization
      fallbackLocale: 'en-us', // The fallback locale of project localization
      localeDir: 'locales', // The directory where store localization messages of project
      enableInSFC: false,  // Enable locale messages in Single file components
    },
  },
};
