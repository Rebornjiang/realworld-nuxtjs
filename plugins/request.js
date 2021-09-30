import axios from 'axios'


const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

export { request }

export default ({ store }, inject) => {
  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) config.headers.Authorization = `Token ${user.token}`
    return config
  }, function (error) {

  })

  // 响应拦截器
  request.interceptors.response.use(function (response) {

    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}




// export default request