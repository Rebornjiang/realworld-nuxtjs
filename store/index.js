const cookieparser = process.server ? require('cookieparser') : undefined


export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      console.log(parsed)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
      console.log({parsed, user})
      // commit('user/setUserInfo', user)
    }
  }
}