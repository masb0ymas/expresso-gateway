import { AxiosResponse } from 'axios'
import BaseAccount from '../Base/BaseAccount'

const repo = new BaseAccount({ endpoint: '/v1/session' })

class SessionService {
  public static api = repo.api

  /**
   *
   * @param formData
   * @returns
   */
  public static async findByUserToken(
    formData: any
  ): Promise<AxiosResponse<any>> {
    const response = await repo.api.post('/current', formData)
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
    const response = await repo.create(formData)
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
    const response = await repo.api.post(`/by-user-token`, formData)
    return response
  }
}

export default SessionService
