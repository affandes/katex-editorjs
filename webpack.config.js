const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/katex-editor.js",
    output: {
        umdNamedDefine: true,
        path: path.resolve(__dirname, "dist"),
        filename: "katex-editor.js",
        library: "KatexEditor",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            }
        ]
    },
    externals: [
        "katex",
        /^katex\/.+$/,
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "app")
    }
};