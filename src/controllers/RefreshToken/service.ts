import { AxiosInstance } from 'axios'
import Fetcher from 'config/Fetcher'

require('dotenv').config()

const API_SERVICE_USER = process.env.API_SERVICE_USER || 'http://localhost:8001'

const FetchApi = new Fetcher(API_SERVICE_USER)

class RefreshTokenService {
  private default: AxiosInstance

  constructor() {
    this.default = FetchApi.default
  }

  /**
   *
   * @param id
   */
  getToken(token: string) {
    return this.default.get(`/v1/refresh-token?refreshToken=${token}`)
  }

  /**
   *
   * @param formData
   */
  create(formData: any) {
    return this.default.post(`/v1/refresh-token`, formData)
  }
}

export default RefreshTokenService
