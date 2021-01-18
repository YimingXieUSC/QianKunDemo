module.exports = {
  devServer: {
    proxy: {
      '^/dev-api': {
        target: 'http://localhost:8083',
        changeOrigin: true
      }
    }
  }
}
