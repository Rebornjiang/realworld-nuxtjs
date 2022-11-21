
import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com'
  // baseURL: 'https://conduit.productionready.io'
})

// 获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default ({ store }) => {

  request.interceptors.request.use(function (config) {

    const { user } = store.state

    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }

    return config
  }, function (error) {
    return Promise.reject(error)
  })
}
