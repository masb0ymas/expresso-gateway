import { AxiosInstance } from 'axios'
import Fetcher from 'config/Fetcher'

require('dotenv').config()

const API_SERVICE_USER = process.env.API_SERVICE_USER || 'http://localhost:8001'

const FetchApi = new Fetcher(API_SERVICE_USER)

class RefreshTokenService {
  private api: AxiosInstance

  constructor() {
    this.api = FetchApi.default
  }

  /**
   *
   * @param id
   */
  getToken(token: string) {
    return this.api.get(`/v1/refresh-token?refreshToken=${token}`)
  }

  /**
   *
   * @param formData
   */
  create(formData: any) {
    return this.api.post(`/v1/refresh-token`, formData)
  }
}

export default RefreshTokenService
