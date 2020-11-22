import { AxiosInstance } from 'axios'
import Fetcher from 'config/Fetcher'

require('dotenv').config()

const API_SERVICE_USER = process.env.API_SERVICE_USER || 'http://localhost:8001'

const FetchApi = new Fetcher(API_SERVICE_USER)

class AuthService {
  private default: AxiosInstance

  constructor() {
    this.default = FetchApi.default
  }

  register(formData: any) {
    return this.default.post(`/v1/auth/sign-up`, formData)
  }

  login(formData: any) {
    return this.default.post(`/v1/auth/sign-in`, formData)
  }

  getProfile() {
    return this.default.get(`/v1/profile`)
  }
}

export default AuthService
