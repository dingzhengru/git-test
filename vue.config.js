// module.exports = {
//   configureWebpack: {
//     optimization: {
//       splitChunks: {
//         cacheGroups: {
//           default: false,
//           // Custom common chunk
//           bundle: {
//             name: 'commons',
//             chunks: 'all',
//             minChunks: 3,
//             reuseExistingChunk: false,
//           },
//           // Customer vendor
//           vendors: {
//             chunks: 'initial',
//             name: 'vendors',
//             test: 'vendors',
//           },
//           // Merge all the CSS into one file
//           styles: {
//             name: 'styles',
//             test: /\.s?css$/,
//             chunks: 'all',
//             minChunks: 3,
//             reuseExistingChunk: true,
//             enforce: true,
//           },
//         },
//       },
//     },
//   },
// };
