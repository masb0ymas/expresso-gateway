import { Request, Response } from 'express'
import ms from 'ms'
import jwt from 'jsonwebtoken'
import asyncHandler from 'helpers/asyncHandler'
import routes from 'routes/public'
import RefreshToken from 'controllers/RefreshToken/service'
import Authorization from 'middlewares/Authorization'
import ResponseError from 'modules/Response/ResponseError'
import { verifyRefreshToken } from 'helpers/Token'
import { get, isObject } from 'lodash'

interface verifyRefreshTokenAttributes {
  id: string
  nama: string
  email: string
  active: boolean
}

const { JWT_SECRET_ACCESS_TOKEN }: any = process.env
const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || '1d'

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000

const RefreshTokenService = new RefreshToken()

routes.post(
  '/refresh-token',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { email, refreshToken } = req.getBody()

    if (!email || !refreshToken) {
      throw new ResponseError.BadRequest('invalid token')
    }

    const resToken = await RefreshTokenService.getToken(refreshToken)
    const getToken = get(resToken, 'data.data', {})
    const verifyToken = verifyRefreshToken(getToken.token)

    if (isObject(verifyToken?.data)) {
      // @ts-ignore
      const decodeToken: verifyRefreshTokenAttributes = verifyToken?.data

      if (email !== decodeToken?.email) {
        throw new ResponseError.BadRequest('email is not valid')
      }

      const payloadToken = {
        id: decodeToken?.id,
        nama: decodeToken?.nama,
        email: decodeToken?.email,
        active: decodeToken?.active,
      }

      // Access Token
      const accessToken = jwt.sign(
        JSON.parse(JSON.stringify(payloadToken)),
        JWT_SECRET_ACCESS_TOKEN,
        {
          expiresIn,
        }
      )

      return res
        .status(200)
        .json({ accessToken, expiresIn, tokenType: 'Bearer' })
    }
  })
)
