const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new HtmlWebpackPlugin()
    ]
};
