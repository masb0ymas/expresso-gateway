import { AxiosResponse } from 'axios'
import BaseAccount from '../BaseAccount'

class SessionService {
  private static readonly repo = new BaseAccount({ endpoint: '/v1/session' })

  /**
   *
   * @param formData
   * @returns
   */
  public static async findByUserToken(
    formData: any
  ): Promise<AxiosResponse<any>> {
    const response = await this.repo.api.post('/current', formData)
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
    const response = await this.repo.create(formData)
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
    const response = await this.repo.api.post(`/by-user-token`, formData)
    return response
  }
}

export default SessionService
