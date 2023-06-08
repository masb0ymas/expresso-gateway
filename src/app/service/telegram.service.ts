import { type AxiosResponse } from 'axios'
import qs from 'qs'
import FetchAxios from '~/config/axios'
import { env } from '~/config/env'

const Fetcher = new FetchAxios(env.TELEGRAM_API_URL)
const BOT_TOKEN = String(env.TELEGRAM_BOT_TOKEN)

export default class TelegramService {
  public static api = Fetcher.default

  /**
   * Get Updates
   * @returns
   */
  public static async getUpdates(): Promise<AxiosResponse<any>> {
    const response = await this.api.get(`/bot${BOT_TOKEN}/getUpdates`)
    return response
  }

  /**
   *
   * @param message
   * @returns
   */
  public static async sendMessage(
    chat_id: string,
    message: string
  ): Promise<AxiosResponse<any>> {
    const queryParams = qs.stringify({ chat_id, text: message })

    const response = await this.api.get(
      `/bot${BOT_TOKEN}/sendMessage?${queryParams}`
    )

    return response
  }
}
