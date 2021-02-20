import { AxiosInstance } from 'axios'
import queryString from 'query-string'
import Fetcher from 'config/Fetcher'

require('dotenv').config()

const API_SERVICE_USER = process.env.API_SERVICE_USER || 'http://localhost:8001'

/*
  Query Params like this :
  example.com?page=1&pageSize=2&filtered=[{"id": "nama", "value": "admin"}]&sorted=[{"id": "nama", "desc": true}]
*/

interface queryAttributes {
  page?: string
  pageSize?: string
  filtered?: string
  sorted?: string
}

const FetchApi = new Fetcher(API_SERVICE_USER)

class UserService {
  private api: AxiosInstance

  constructor() {
    this.api = FetchApi.default
  }

  /**
   *
   * @param params params like query string
   * @example
   * // example.com?filtered=[]&sorted=[]&page=1&pageSize=10
   */
  getAll(params: queryAttributes) {
    const query = { ...params }
    const queryParams = queryString.stringify(query)
    return this.api.get(`/v1/user/?${queryParams}`)
  }

  /**
   *
   * @param id
   */
  getOne(id: string) {
    return this.api.get(`/v1/user/${id}`)
  }

  /**
   *
   * @param formData
   */
  create(formData: any) {
    return this.api.post(`/v1/user`, formData)
  }

  /**
   *
   * @param id
   * @param formData
   */
  update(id: string, formData: any) {
    return this.api.put(`/v1/user/${id}`, formData)
  }

  /**
   *
   * @param id
   */
  destroy(id: string) {
    return this.api.delete(`/v1/user/${id}`)
  }
}

export default UserService
