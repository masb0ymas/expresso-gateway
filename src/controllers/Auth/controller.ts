import { Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import BuildResponse from 'modules/Response/BuildResponse'
import routes from 'routes/public'
import Auth from 'controllers/Auth/service'
import Authorization from 'middlewares/Authorization'

const AuthService = new Auth()

routes.post(
  '/register',
  asyncHandler(async function register(req: Request, res: Response) {
    const formData = req.getBody()

    const resData = await AuthService.register(formData)
    const { message, data } = resData.data
    const buildResponse = BuildResponse.created({ message, data })

    return res.status(201).json(buildResponse)
  })
)

routes.post(
  '/login',
  asyncHandler(async function login(req: Request, res: Response) {
    const formData = req.getBody()

    const resData = await AuthService.login(formData)
    const { token, tokenType, expiresIn } = resData.data
    const buildResponse = BuildResponse.get({ token, tokenType, expiresIn })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/profile',
  Authorization,
  asyncHandler(async function getProfile(req: Request, res: Response) {
    const resData = await AuthService.getProfile()
    const { data } = resData.data
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)
