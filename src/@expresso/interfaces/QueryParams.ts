/*
  Query Params like this :
  example.com?page=1&pageSize=2&filtered=[{"id": "nama", "value": "admin"}]&sorted=[{"id": "nama", "desc": true}]
*/

export interface QueryParamsAttributes {
  page: string
  pageSize: string
  filtered: string
  sorted: string
}

export interface MultipleIdsEntity {
  ids: string | string[]
}
