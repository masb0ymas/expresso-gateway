import { Request, Response } from 'express'
import ms from 'ms'
import jwt from 'jsonwebtoken'
import asyncHandler from '@expresso/helpers/asyncHandler'
import BuildResponse from '@expresso/modules/Response/BuildResponse'
import routes from 'routes/public'
import Auth from 'controllers/Auth/service'
import User from 'controllers/User/service'
import RefreshToken from 'controllers/RefreshToken/service'
import Authorization from 'middlewares/Authorization'
import { get } from 'lodash'

require('dotenv').config()

const AuthService = new Auth()
const UserService = new User()
const RefreshTokenService = new RefreshToken()

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || '1d' // 7 Days
const JWT_REFRESH_TOKEN_EXPIRED = process.env.JWT_REFRESH_TOKEN_EXPIRED || '30d' // 30 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000

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
    const { tokenType, data } = resData.data

    const payloadToken = {
      id: data.id,
      nama: data.fullName,
      email: data.email,
      active: data.active,
    }

    // Access Token
    const accessToken = jwt.sign(
      JSON.parse(JSON.stringify(payloadToken)),
      JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn,
      }
    )

    // Refresh Token
    const refreshToken = jwt.sign(
      JSON.parse(JSON.stringify(payloadToken)),
      JWT_SECRET_REFRESH_TOKEN,
      {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
      }
    )

    const formDataRefreshToken = {
      UserId: data.id,
      token: refreshToken,
    }

    await RefreshTokenService.create(formDataRefreshToken)
    const buildResponse = BuildResponse.get({
      message: 'Login successfully',
      accessToken,
      tokenType,
      expiresIn,
      refreshToken,
      user: payloadToken,
    })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/profile',
  Authorization,
  asyncHandler(async function getProfile(req: Request, res: Response) {
    const userData = req.getState('user')

    const resUser = await UserService.getOne(userData.id)
    const data = get(resUser, 'data.data', {})
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/logout',
  Authorization,
  asyncHandler(async function authLogout(req: Request, res: Response) {
    const formData = req.getBody()

    const resData = await AuthService.logout(formData)
    const { message } = resData.data
    const buildResponse = BuildResponse.deleted({ message })

    return res.status(200).json(buildResponse)
  })
)
