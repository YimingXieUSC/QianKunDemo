const path = require('path')
const packageName = require('./package.json').name

console.log(packageName)

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '//localhost:8084',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 8084,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  configureWebpack: {
    name: packageName,
    resolve: {
      alias: {
        '@': resolve('src'),
        '_c': resolve('src/components')
      }
    },
    entry: {
      'app-vue-admin2': './src/main.js'
    },
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  }
}
