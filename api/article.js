import { request } from "@/plugins/request.js";


export const addArticle = (data) => {
  return request({
    url: '/api/articles',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZmYWQxQHFxLmNvbSIsInVzZXJuYW1lIjoicmVib3JuamlhbmciLCJwYXNzd29yZCI6IiQyYSQxMCRWbERzRFp3WDdOMm5TaUwyUHVBUXplVU5ObThXcndtT1p6RC9NbzRBSjViTHhpRmlqQlIxQyIsImJpbyI6bnVsbCwiaW1hZ2UiOiJodHRwczovL3JlYWx3b3JsZC10ZW1wLWFwaS5oZXJva3VhcHAuY29tL2ltYWdlcy9zbWlsZXktY3lydXMuanBlZyIsImlhdCI6MTYzMjkwNTkxMCwiZXhwIjoxNjM4MDg5OTEwfQ.xTteKWu7CRYMYWkhjFcssiIaQ52N5InYW4c62gSrEEY'
    }
  })
}