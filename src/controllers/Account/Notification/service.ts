import { NotificationAttributes } from '@database/entities/Notification'
import {
  MultipleIdsEntity,
  QueryParamsAttributes,
} from '@expresso/interfaces/QueryParams'
import { AxiosResponse } from 'axios'
import queryString from 'query-string'
import BaseAccount from '../Base/BaseAccount'

const repo = new BaseAccount({ endpoint: '/v1/notification' })

class NotificationService {
  public static api = repo.api

  /**
   *
   * @param queryParams
   * @returns
   */
  public static async findAll(
    queryParams: Partial<QueryParamsAttributes>
  ): Promise<AxiosResponse<any, any>> {
    const newQuery = queryString.stringify({ ...queryParams })
    const response = await repo.findAll(newQuery)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async findById(id: string): Promise<AxiosResponse<any, any>> {
    const response = await repo.findById(id)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async create(
    formData: NotificationAttributes
  ): Promise<AxiosResponse<any, any>> {
    const response = await repo.create(formData)
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
    formData: NotificationAttributes
  ): Promise<AxiosResponse<any, any>> {
    const response = await repo.update(id, formData)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async restore(id: string): Promise<AxiosResponse<any, any>> {
    const response = await repo.restore(id)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async softDelete(id: string): Promise<AxiosResponse<any, any>> {
    const response = await repo.softDelete(id)
    return response
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async forceDelete(
    id: string
  ): Promise<AxiosResponse<any, any>> {
    const response = await repo.forceDelete(id)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async multipleRestore(
    formData: MultipleIdsEntity
  ): Promise<AxiosResponse<any, any>> {
    const response = await repo.multipleRestore(formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async multipleSoftDelete(
    formData: MultipleIdsEntity
  ): Promise<AxiosResponse<any, any>> {
    const response = await repo.multipleSoftDelete(formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async multipleForceDelete(
    formData: MultipleIdsEntity
  ): Promise<AxiosResponse<any, any>> {
    const response = await repo.multipleForceDelete(formData)
    return response
  }
}

export default NotificationService
