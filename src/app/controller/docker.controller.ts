import { type Request, type Response } from 'express'
import _ from 'lodash'
import HttpResponse from '~/core/modules/response/HttpResponse'
import { asyncHandler } from '~/core/utils/asyncHandler'
import route from '~/routes/v1'
import SlackService from '../service/slack.service'
import TelegramService from '../service/telegram.service'

route.get(
  '/docker-hub',
  asyncHandler(async function getDocker(_req: Request, res: Response) {
    const data = {
      message: 'Webhook Docker is Ready...',
    }

    const httpResponse = HttpResponse.get(data)
    res.status(200).json(httpResponse)
  })
)

/**
 * Webhook from Docker Hub send to Telegram
 */
route.post(
  '/docker-hub/send-telegram',
  asyncHandler(async function postTelegram(req: Request, res: Response) {
    const { chatId } = req.getQuery()
    const formData = req.getBody()

    const buildVersion = _.get(formData, 'push_data.tag', '')
    const repoName = _.get(formData, 'repository.name', '')

    const message = `Docker Hub ${repoName} (${buildVersion}) is ready...`
    const response = await TelegramService.sendMessage(chatId, message)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

/**
 * Webhook from Docker Hub send to Slack
 */
route.post(
  '/docker-hub/send-slack',
  asyncHandler(async function postSlack(req: Request, res: Response) {
    const { channel } = req.getQuery()
    const formData = req.getBody()

    const buildVersion = _.get(formData, 'push_data.tag', '')
    const repoName = _.get(formData, 'repository.name', '')

    const message = `Docker Hub ${repoName} (${buildVersion}) is ready...`
    const response = await SlackService.postMessage(channel, message)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)
