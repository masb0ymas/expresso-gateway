import dotenv from 'dotenv'
import FetchApi from '@config/Fetcher'
import { AxiosResponse } from 'axios'

dotenv.config()

const API_SERVICE_USER = process.env.API_SERVICE_USER ?? 'http://localhost:8001'

const Fetcher = new FetchApi(API_SERVICE_USER)

class AuthService {
  private static readonly axiosInstance = Fetcher.default

  /**
   *
   * @param formData
   * @returns
   */
  public static async signUp(formData: any): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(`/v1/auth/sign-up`, formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async signIn(formData: any): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(`/v1/auth/sign-in`, formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async logout(formData: any): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(`/v1/logout`, formData)
    return response
  }
}

export default AuthService
