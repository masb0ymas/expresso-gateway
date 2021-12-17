import { API_SERVICE_USER } from '@config/env'
import FetchApi from '@config/Fetcher'
import { QueryParamsAttributes } from '@expresso/interfaces/QueryParams'
import { AxiosResponse } from 'axios'
import queryString from 'query-string'

const Fetcher = new FetchApi(API_SERVICE_USER)

class RoleService {
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
    params: Partial<QueryParamsAttributes>
  ): Promise<AxiosResponse<any>> {
    const query = { ...params }
    const queryParams = queryString.stringify(query)

    const response = await this.axiosInstance.get(`/v1/role?${queryParams}`)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async findById(id: string): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.get(`/v1/role/${id}`)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async create(formData: any): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.post(`/v1/role`, formData)
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
    const response = await this.axiosInstance.put(`/v1/role/${id}`, formData)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async restore(id: string): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.put(`/v1/role/restore/${id}`)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async softDelete(id: string): Promise<AxiosResponse<any>> {
    const response = await this.axiosInstance.delete(
      `/v1/role/soft-delete/${id}`
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
      `/v1/role/force-delete/${id}`
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
      `/v1/role/multiple/restore`,
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
      `/v1/role/multiple/soft-delete`,
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
      `/v1/role/multiple/force-delete`,
      formData
    )
    return response
  }
}

export default RoleService
