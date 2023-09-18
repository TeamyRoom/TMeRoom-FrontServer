const path = require('path');

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    plugins: [
        new NodePolyfillPlugin()
    ],
}

// module.exports = {
//   entry: './src/index.js',
//   mode: process.env.NODE_ENV || 'development',
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist'),
//     libraryTarget: 'var',
//     library: 'Lib'
//   },
//   resolve: {
//     fallback: {
//       "os": require.resolve("os-browserify/browser")
//     }
//   },
//   devServer: {
//   	static: path.join(__dirname, 'dist')
//   }
// };
