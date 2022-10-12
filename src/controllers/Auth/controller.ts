import SessionService from '@controllers/Account/Session/service'
import UserService from '@controllers/Account/User/service'
import { SessionEntity } from '@database/entities/Session'
import { UserEntity, UserLoginAttributes } from '@database/entities/User'
import asyncHandler from '@expresso/helpers/asyncHandler'
import { validateEmpty } from '@expresso/helpers/Formatter'
import {
  currentToken,
  generateAccessToken,
  verifyAccessToken,
} from '@expresso/helpers/Token'
import userAgentHelper from '@expresso/helpers/userAgent'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import ResponseError from '@expresso/modules/Response/ResponseError'
import Authorization from '@middlewares/Authorization'
import route from '@routes/v1'
import { Request, Response } from 'express'
import _ from 'lodash'
import AuthService from './service'

route.post(
  '/auth/sign-up',
  asyncHandler(async function signUp(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await AuthService.signUp(formData)

    const httpResponse = HttpResponse.created(response.data)
    res.status(201).json(httpResponse)
  })
)

route.post(
  '/auth/sign-in',
  asyncHandler(async function signIn(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await AuthService.signIn(formData)
    const userData = response.data?.data as UserEntity

    const payloadToken = { uid: userData.id }
    const accessToken = generateAccessToken(payloadToken)

    // create session
    await SessionService.createOrUpdate({
      UserId: userData.id,
      token: accessToken.accessToken,
      ipAddress: req.clientIp?.replace('::ffff:', ''),
      device: userAgentHelper.currentDevice(req),
      platform: userAgentHelper.currentPlatform(req),
      latitude: validateEmpty(formData.latitude),
      longitude: validateEmpty(formData.longitude),
    })

    // response
    const httpResponse = HttpResponse.get({
      message: 'Login successfully',
      ...accessToken,
      tokenType: 'Bearer',
      user: payloadToken,
    })

    res
      .status(response.status)
      .cookie('token', accessToken.accessToken, {
        maxAge: Number(accessToken.expiresIn) * 1000,
        httpOnly: true,
        path: '/v1',
        secure: process.env.NODE_ENV === 'production',
      })
      .json(httpResponse)
  })
)

route.get(
  '/auth/verify-session',
  Authorization,
  asyncHandler(async function verifySession(req: Request, res: Response) {
    const getToken = currentToken(req)
    const userLogin = req.getState('userLogin') as UserLoginAttributes

    let resStatus = 200

    const resSession = await SessionService.findByUserToken({
      UserId: userLogin.uid,
      token: getToken,
    })
    resStatus = resSession.status
    const getSession = resSession.data?.data as SessionEntity
    const verifyToken = verifyAccessToken(getSession.token)

    const userToken = verifyToken?.data as UserLoginAttributes

    if (_.isEmpty(userToken.uid)) {
      throw new ResponseError.Unauthorized(
        'the login session has ended, please re-login'
      )
    }
    const resUser = await UserService.findById(userToken.uid)
    resStatus = resUser.status

    const httpResponse = HttpResponse.get(resUser.data)
    res.status(resStatus).json(httpResponse)
  })
)

route.post(
  '/logout',
  Authorization,
  asyncHandler(async function logout(req: Request, res: Response) {
    const formData = req.getBody()
    const getToken = currentToken(req)
    const userLogin = req.getState('userLogin') as UserLoginAttributes

    if (userLogin.uid !== formData.UserId) {
      throw new ResponseError.BadRequest('invalid user login')
    }

    const resUser = await UserService.findById(userLogin.uid)
    const getUser = resUser.data?.data as UserEntity

    // clean session
    await SessionService.deleteByUserToken({
      UserId: getUser.id,
      token: getToken,
    })
    const message = 'You have logged out of the application'

    const httpResponse = HttpResponse.get({ message })
    res
      .status(resUser.status)
      .clearCookie('token', { path: '/v1' })
      .json(httpResponse)
  })
)
