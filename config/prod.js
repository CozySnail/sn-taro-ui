/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {},
  // 小程序端专用配置
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 1024000000 // 文件大小限制
          }
        }
      }
    }
  },
  h5: {}
};
