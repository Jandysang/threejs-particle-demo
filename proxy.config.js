module.exports = {
    '/api': {
        target: 'https://www.shareplus.plus/',
        changeOrigin: true,
        pathRewrite: {
            // '^/api/': '/'
        }
    }
}