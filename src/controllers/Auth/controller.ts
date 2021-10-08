import asyncHandler from '@expresso/helpers/asyncHandler'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import route from '@routes/v1'
import { Request, Response } from 'express'
import AuthService from './service'

route.post(
  '/auth/sign-up',
  asyncHandler(async function signUp(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await AuthService.signUp(formData)

    const httpResponse = HttpResponse.created(response.data)
    return res.status(201).json(httpResponse)
  })
)

route.post(
  '/auth/sign-in',
  asyncHandler(async function signIn(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await AuthService.signIn(formData)

    const httpResponse = HttpResponse.created(response.data)
    return res.status(200).json(httpResponse)
  })
)

route.post(
  '/logout',
  asyncHandler(async function logout(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await AuthService.logout(formData)

    const httpResponse = HttpResponse.created(response.data)
    return res.status(200).json(httpResponse)
  })
)
