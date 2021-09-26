const { createRoutes } = require('./router/')
module.exports = {
  router: {
    // routes : 为 nuxt 根据 pages 目录生成的路由配置表
    // resolve : 该函数用于解析路径的
    extendRoutes(routes, resolve) {
      const path = __dirname
      // 废掉 nuxt 生成的默认路由表
      routes.splice(0)
      // 加载自定义路由规则
      routes.push(...createRoutes(path, resolve))
      // routes.push(...[
      //   {
      //     path: '/',
      //     name: 'Layout',
      //     component: resolve(path, 'pages/layout/index.vue')
      //   }
      // ])
    },
    linkActiveClass: 'active'
  }
}