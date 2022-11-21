import { request } from "@/plugins/request.js";

export const getArticleList = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 文章tag标签
export const getTagList = () => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}
