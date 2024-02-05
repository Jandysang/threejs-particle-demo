const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const year = new Date().getFullYear()
const env = process.env.NODE_ENV || 'development'
const folderName = `pshare/pc/${env}/${year}`
module.exports = {
    mode: 'production',
    output: {
        publicPath: `//image.shareplus.plus/${folderName}/`
    },
    plugins: [
        new OptimizeCSSAssetsPlugin()
    ]
}