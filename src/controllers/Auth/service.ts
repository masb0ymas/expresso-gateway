import BaseAccount from '@controllers/Account/Base/BaseAccount'
import { AxiosResponse } from 'axios'

const repo = new BaseAccount({ endpoint: '/v1/auth' })

class AuthService {
  /**
   *
   * @param formData
   * @returns
   */
  public static async signUp(formData: any): Promise<AxiosResponse<any>> {
    const response = await repo.api.post(`/v1/auth/sign-up`, formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async signIn(formData: any): Promise<AxiosResponse<any>> {
    const response = await repo.api.post(`/v1/auth/sign-in`, formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async logout(formData: any): Promise<AxiosResponse<any>> {
    const response = await repo.api.post(`/v1/logout`, formData)
    return response
  }
}

export default AuthService
