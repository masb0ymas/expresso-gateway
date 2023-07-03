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

    console.log({ formData })

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

    console.log({ formData })

    const buildVersion = _.get(formData, 'push_data.tag', '')
    const repoName = _.get(formData, 'repository.name', '')

    const message = `Docker Hub ${repoName} (${buildVersion}) is ready...`
    const response = await SlackService.postMessage(channel, message)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

/**
 * Webhook from Docker Hub
 */
route.post(
  '/docker-hub',
  asyncHandler(async function postDocker(req: Request, res: Response) {
    const { slack_channel, telegram_chat_id } = req.getQuery()
    const formData = req.getBody()

    console.log({ formData })

    const buildVersion = _.get(formData, 'push_data.tag', '')
    const repoName = _.get(formData, 'repository.repo_name', '')

    const message = `Docker Hub - ${repoName}:${buildVersion} is ready...`

    // send to slack
    if (!_.isEmpty(slack_channel)) {
      await SlackService.postMessage(slack_channel, message)
    }

    // send to telegram
    if (!_.isEmpty(telegram_chat_id)) {
      await TelegramService.sendMessage(telegram_chat_id, message)
    }

    const httpResponse = HttpResponse.get({})
    res.status(200).json(httpResponse)
  })
)

/**
 * Webhook from Workflow Github Action
 */
route.post(
  '/workflow-github',
  asyncHandler(async function postGithub(req: Request, res: Response) {
    const { slack_channel, telegram_chat_id, registry } = req.getQuery()
    const formData = req.getBody()

    console.log({ formData })

    const buildVersion = _.get(formData, 'push_data.tag', '')
    const repoName = _.get(formData, 'repository.name', '')

    const message = `${registry} ${repoName}:${buildVersion} is ready...`

    // send to slack
    if (!_.isEmpty(slack_channel)) {
      await SlackService.postMessage(slack_channel, message)
    }

    // send to telegram
    if (!_.isEmpty(telegram_chat_id)) {
      await TelegramService.sendMessage(telegram_chat_id, message)
    }

    const httpResponse = HttpResponse.get({})
    res.status(200).json(httpResponse)
  })
)
