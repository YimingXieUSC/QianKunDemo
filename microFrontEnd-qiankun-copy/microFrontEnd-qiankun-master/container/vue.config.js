module.exports = {
  devServer: {
    proxy: {
      '^/dev-api': {
        target: 'http://192.168.11.191:8888',
        // target: 'http://192.168.11.191:8083',
        // target: 'http://localhost:8083',
        changeOrigin: true
      }
    }
  }
}

