const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    mode: 'production',
    output: {
        publicPath: `/`
    },
    plugins: [
        new OptimizeCSSAssetsPlugin()
    ]
}