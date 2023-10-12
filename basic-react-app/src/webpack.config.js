const path = require('path');

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    plugins: [
        new NodePolyfillPlugin()
    ],
    entry: './src/index.js', // 애플리케이션 진입점 파일
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        {
            test: /\.scss$/, // .scss 확장자를 가진 파일들에 대한 처리
            use: [
                'style-loader', // HTML에 스타일을 삽입하는 로더
                'css-loader',   // CSS 파일을 모듈로 로드하는 로더
                'sass-loader'   // SCSS 파일을 CSS로 변환하는 로더
            ],
        },
        ],
    },
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
