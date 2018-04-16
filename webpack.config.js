const webpack = require('webpack')
const path = require('path')

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false,
    SourceRoot: path.resolve(__dirname, 'src/'),
}

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'NewickJS',
        libraryTarget: 'umd',
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            },
        ],
    },
}
