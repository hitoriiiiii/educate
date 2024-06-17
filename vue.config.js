const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:42878/', // 后端接口，后端代码本地调试
        ws: true, //用于支持websocket
        changeOrigin: true, // 是否跨域
        pathRewrite:  {'^/api': ''}
      }
    }
  }
})