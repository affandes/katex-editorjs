const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'katex-editor.js',
        library: 'KatexEditor',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    externals: {
        'katex/katex': {
            commonjs: 'katex',
            commonjs2: 'katex',
            amd: 'katex',
            root: 'katex',
        }
    },
    devServer: {
        contentBase: './dist'
    }
};