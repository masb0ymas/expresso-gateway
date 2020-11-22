import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from 'helpers/asyncHandler'
import BuildResponse from 'modules/Response/BuildResponse'
import routes from 'routes/public'
import Auth from 'controllers/Auth/service'
import Authorization from 'middlewares/Authorization'

const AuthService = new Auth()

const { JWT_SECRET }: any = process.env

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
    const { tokenType, expiresIn, data } = resData.data

    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn,
    })

    const buildResponse = BuildResponse.get({
      token,
      tokenType,
      expiresIn,
      data,
    })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/profile',
  Authorization,
  asyncHandler(async function getProfile(req: Request, res: Response) {
    const { user }: any = req.state
    const buildResponse = BuildResponse.get({ data: user.data })

    return res.status(200).json(buildResponse)
  })
)
