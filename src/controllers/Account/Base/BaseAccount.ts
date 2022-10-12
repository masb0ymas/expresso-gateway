import { API_SERVICE_USER } from '@config/env'
import FetchApi from '@config/Fetcher'
import { MultipleIdsEntity } from '@expresso/interfaces/QueryParams'
import { AxiosInstance, AxiosResponse } from 'axios'

interface BaseAccountEntity {
  endpoint: string
}

const Fetcher = new FetchApi(API_SERVICE_USER)

class BaseAccount {
  public api: AxiosInstance
  private readonly endpoint: string

  constructor(value: BaseAccountEntity) {
    this.api = Fetcher.default
    this.endpoint = value.endpoint
  }

  /**
   *
   * @param queryParams
   * @returns
   */
  public async findAll(queryParams: string): Promise<AxiosResponse<any, any>> {
    return await this.api.get(`${this.endpoint}?${queryParams}`)
  }

  /**
   *
   * @param id
   * @returns
   */
  public async findById(id: string): Promise<AxiosResponse<any, any>> {
    return await this.api.get(`${this.endpoint}/${id}`)
  }

  /**
   *
   * @param formData
   * @returns
   */
  public async create<TData>(
    formData: TData
  ): Promise<AxiosResponse<any, any>> {
    return await this.api.post(`${this.endpoint}`, formData)
  }

  /**
   *
   * @param id
   * @param formData
   * @returns
   */
  public async update<TData>(
    id: string,
    formData: TData
  ): Promise<AxiosResponse<any, any>> {
    return await this.api.put(`${this.endpoint}/${id}`, formData)
  }

  /**
   *
   * @param id
   * @returns
   */
  public async restore(id: string): Promise<AxiosResponse<any, any>> {
    return await this.api.put(`${this.endpoint}/restore/${id}`)
  }

  /**
   *
   * @param id
   * @returns
   */
  public async softDelete(id: string): Promise<AxiosResponse<any, any>> {
    return await this.api.delete(`${this.endpoint}/soft-delete/${id}`)
  }

  /**
   *
   * @param id
   * @returns
   */
  public async forceDelete(id: string): Promise<AxiosResponse<any, any>> {
    return await this.api.delete(`${this.endpoint}/force-delete/${id}`)
  }

  /**
   *
   * @param data
   * @returns
   */
  public async multipleRestore(
    data: MultipleIdsEntity
  ): Promise<AxiosResponse<any, any>> {
    return await this.api.post(`${this.endpoint}/multiple/restore`, data)
  }

  /**
   *
   * @param data
   * @returns
   */
  public async multipleSoftDelete(
    data: MultipleIdsEntity
  ): Promise<AxiosResponse<any, any>> {
    return await this.api.post(`${this.endpoint}/multiple/soft-delete`, data)
  }

  /**
   *
   * @param data
   * @returns
   */
  public async multipleForceDelete(
    data: MultipleIdsEntity
  ): Promise<AxiosResponse<any, any>> {
    const response = await this.api.post(
      `${this.endpoint}/multiple/force-delete`,
      data
    )
    return response
  }
}

export default BaseAccount
