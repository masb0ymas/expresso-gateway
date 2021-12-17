import { API_SERVICE_USER } from '@config/env'
import FetchApi from '@config/Fetcher'
import { AxiosResponse } from 'axios'

const Fetcher = new FetchApi(API_SERVICE_USER)

class SessionService {
  private static readonly axiosInstance = Fetcher.default

  /**
   *
   * @param UserId
   * @param token
   * @returns
   */
  public static async findByUserToken(
    formData: any
  ): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(
      `/v1/session/current`,
      formData
    )
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async createOrUpdate(
    formData: any
  ): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(`/v1/session`, formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async deleteByUserToken(
    formData: any
  ): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(
      `/v1/session/by-user-token`,
      formData
    )
    return response
  }
}

export default SessionService
