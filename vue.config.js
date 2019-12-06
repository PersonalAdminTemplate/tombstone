const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './', //打包后的位置(如果不设置这个静态资源会报404)
  outputDir: 'tombstone', //打包后的目录名称
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
