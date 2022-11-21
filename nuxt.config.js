/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)

      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ])
    }
  },

  /** 
   * “0.0.0.0是本网络中的本主机”这种老掉牙中文教科书说法就不要提了。
   * 实际上外文资料/软件里一般把0.0.0.0称为“unspecified”，即未指定（即无效的，无意义的）地址。
   * 从功能上看，一般用于某些程序/网络协议中不便使用具体ip的特殊情况（说白了就是一个用于某些比较坑的情况的“占位符”），比如DHCP客户端还未获取到ip的时候规定使用0.0.0.0作“源地址”，
   * 或者服务器不指定在哪个网卡上监听时，也使用0.0.0.0。
  */


  server: {
    host: '0.0.0.0',
    port: 3001
  },

  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}
