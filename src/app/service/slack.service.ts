import { type AxiosResponse } from 'axios'
import FetchAxios from '~/config/axios'
import { env } from '~/config/env'

const Fetcher = new FetchAxios(env.SLACK_API_URL)
const BOT_TOKEN = String(env.SLACK_TOKEN)

export default class SlackService {
  private static readonly api = Fetcher.default

  /**
   *
   * @param message
   * @returns
   */
  public static async postMessage(
    channel: string,
    message: string
  ): Promise<AxiosResponse<any>> {
    const formData = { channel, text: message }

    const response = await this.api.post(`/chat.postMessage`, formData, {
      headers: { Authorization: `Bearer ${BOT_TOKEN}` },
    })
    return response
  }
}
