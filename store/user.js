
// 从cookie中取到登录之后的user info


export const state = () => ({
  user: {}
})


export const mutations =  {
  setUserInfo(state, user) {
    state.user = user
  }
}