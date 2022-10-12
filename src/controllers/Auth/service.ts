import BaseAccount from '@controllers/Account/Base/BaseAccount'
import { AxiosResponse } from 'axios'

class AuthService {
  private static readonly repo = new BaseAccount({ endpoint: '/v1/auth' })

  /**
   *
   * @param formData
   * @returns
   */
  public static async signUp(formData: any): Promise<AxiosResponse<any>> {
    const response = await this.repo.api.post(`/sign-up`, formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async signIn(formData: any): Promise<AxiosResponse<any>> {
    const response = await this.repo.api.post(`/sign-in`, formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async logout(formData: any): Promise<AxiosResponse<any>> {
    const response = await this.repo.api.post(`/v1/logout`, formData)
    return response
  }
}

export default AuthService
