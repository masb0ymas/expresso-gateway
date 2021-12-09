import FetchApi from '@config/Fetcher'
import { QueryParamsAttributes } from '@expresso/interfaces/QueryParams'
import { AxiosResponse } from 'axios'
import dotenv from 'dotenv'
import queryString from 'query-string'

dotenv.config()

const API_SERVICE_USER = process.env.API_SERVICE_USER ?? 'http://localhost:8001'

const Fetcher = new FetchApi(API_SERVICE_USER)

class UserService {
  private static readonly axiosInstance = Fetcher.default

  /**
   *
   * @param params
   * @example
   * ```sh
   * https://api.example.com?page=1&pageSize=10&filtered=[{"id": "name", "value": "anyValue"}]&sorted=[{"id": "createdAt", "desc": true}]
   * ```
   * @returns
   */
  public static async findAll(
    params: QueryParamsAttributes
  ): Promise<AxiosResponse<any>> {
    const query = { ...params }
    const queryParams = queryString.stringify(query)

    const response = await this.axiosInstance.get(`/v1/user?${queryParams}`)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async findById(id: string): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.get(`/v1/user/${id}`)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async create(formData: any): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(`/v1/user`, formData)
    return response
  }

  /**
   *
   * @param id
   * @param formData
   * @returns
   */
  public static async update(
    id: string,
    formData: any
  ): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.put(`/v1/user/${id}`, formData)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async restore(id: string): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.put(`/v1/user/restore/${id}`)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async softDelete(id: string): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.delete(
      `/v1/user/soft-delete/${id}`
    )
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async forceDelete(id: string): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.delete(
      `/v1/user/force-delete/${id}`
    )
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async multipleRestore(
    formData: any
  ): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(
      `/v1/user/multiple/restore`,
      formData
    )
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async multipleSoftDelete(
    formData: any
  ): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(
      `/v1/user/multiple/soft-delete`,
      formData
    )
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async multipleForceDelete(
    formData: any
  ): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(
      `/v1/user/multiple/force-delete`,
      formData
    )
    return response
  }
}

export default UserService
