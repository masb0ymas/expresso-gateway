import { AxiosInstance } from 'axios'
import queryString from 'query-string'
import Fetcher from 'config/Fetcher'

require('dotenv').config()

const API_SERVICE_USER = process.env.API_SERVICE_USER || 'http://localhost:8001'

/*
  Query Params like :
  example.com?page=1&pageSize=2&filtered=[{"id": "nama", "value": "admin"}]&sorted=[{"id": "nama", "desc": true}]
*/

interface queryAttributes {
  page?: string
  pageSize?: string
  filtered?: string
  sorted?: string
}

const FetchApi = new Fetcher(API_SERVICE_USER)

class Role {
  private default: AxiosInstance

  constructor() {
    this.default = FetchApi.default
  }

  // Get All
  getAll(params: queryAttributes) {
    const query = { ...params }
    const queryParams = queryString.stringify(query)
    return this.default.get(`/v1/role/?${queryParams}`)
  }

  // Get One
  getOne(id: string) {
    return this.default.get(`/v1/role/${id}`)
  }
}

export default Role
