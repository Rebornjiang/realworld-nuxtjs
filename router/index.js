// 路由配置表

function createRoutes(path, resolve) {

  return [
    {
      path: '/',
      name: 'Layout',
      component: resolve(path,'pages/layout/index.vue'),
      children: [
        {
          // '' 为 默认子路由
          path: '',
          name: 'Home',
          component: resolve(path, 'pages/home/index.vue')
        },
        {
          path: 'login',
          name: 'Login',
          component: resolve(path, 'pages/login/index.vue')
        },
        {
          path: 'register',
          name: 'Login',
          component: resolve(path, 'pages/login/index.vue')
        },
        {
          path: 'profile/:username',
          name: 'Profile',
          component: resolve(path, 'pages/profile/index.vue')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: resolve(path, 'pages/settings/index.vue')
        },
        {
          path: 'editor/:slug?',
          name: 'CreateOrEdit',
          component: resolve(path, 'pages/editor/index.vue')
        },
        {
          path: 'article/:slug',
          name: 'Article',
          component: resolve(path, 'pages/article/index.vue')
        }
      ]
    }
  ]
}

module.exports = {
  createRoutes
}