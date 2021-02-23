// const workboxPlugin = require('workbox-webpack-plugin');
// const path = require('path');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const proxy = {
  '/api': {
    target: 'http://api.caza7.re888show.com',
    ws: true,
    changeOrigin: true,
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

    // config.plugin('preload').tap(args => {
    // args[0].include = 'allChunks';
    // args[0].include = 'initial';
    // args[0].include = [/.css/];
    // return args;
    // });

    // config.optimization.minimizer([
    //   new TerserPlugin({
    //     terserOptions: {
    //       mangle: true, // 混淆，默认也是开的，mangle也是可以配置很多选项的，具体看后面的链接
    //       compress: {
    //         drop_console: true, //传true就是干掉所有的console.*这些函数的调用.
    //         drop_debugger: true, //干掉那些debugger;
    //         pure_funcs: ['console.log'], // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
    //       },
    //     },
    //   }),
    // ]);

    // config.optimization.minimizer('terser').tap(args => {
    //   console.log(args[0]);
    //   console.log(args[0].terserOptions);
    //   // args[0].terserOptions.compress.drop_console = true;
    //   args[0].terserOptions.output = {
    //     ...args[0].terserOptions.output,
    //     comments: false,
    //   };
    //   return args;
    // });

    // console.log(config.optimization.get('splitChunks'));

    // config.optimization.splitChunks({
    //   chunks: 'all', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
    //   minSize: 30000, // 最小尺寸，30000
    //   minChunks: 6, // 最小 chunk ，默认1
    //   name: false,
    //   // maxAsyncRequests: 5, // 最大异步请求数， 默认5
    //   // maxInitialRequests: 3, // 最大初始化请求书，默认3
    //   // automaticNameDelimiter: '~', // 打包分隔符
    //   // name: function() {}, // 打包后的名称，此选项可接收 function
    //   // cacheGroups: {
    //   //   // 这里开始设置缓存的 chunks
    //   //   priority: 0, // 缓存组优先级
    //   //   vendor: {
    //   //     // key 为entry中定义的 入口名称
    //   //     chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是async)
    //   //     test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
    //   //     name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
    //   //     minSize: 30000,
    //   //     minChunks: 1,
    //   //     enforce: true,
    //   //     maxAsyncRequests: 5, // 最大异步请求数， 默认1
    //   //     maxInitialRequests: 3, // 最大初始化请求书，默认1
    //   //     reuseExistingChunk: true, // 可设置是否重用该chunk
    //   //   },
    //   // },
    // });

    // console.log(config.optimization.get('splitChunks'));
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
