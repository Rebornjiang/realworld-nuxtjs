const cookieparser = process.server ? require('cookieparser') : undefined



export const actions = {
  // 运行再服务端的函数，用于将数据传递给到客户端
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)

      } catch (err) {
        // No valid cookie found
      }
      commit('user/setUserInfo', user)
    }
  }
}
