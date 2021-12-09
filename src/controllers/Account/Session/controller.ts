import asyncHandler from '@expresso/helpers/asyncHandler'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import Authorization from '@middlewares/Authorization'
import route from '@routes/v1'
import { Request, Response } from 'express'
import SessionService from './service'

route.post(
  '/session',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await SessionService.createOrUpdate(formData)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.post(
  '/session/clear',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await SessionService.deleteByUserToken(formData)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)
