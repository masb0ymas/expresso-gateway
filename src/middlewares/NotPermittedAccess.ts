import UserService from '@controllers/Account/User/service'
import { UserEntity, UserLoginAttributes } from '@database/entities/User'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import chalk from 'chalk'
import { NextFunction, Request, Response } from 'express'

function NotPermittedAccess(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userLogin = req.getState('userLogin') as UserLoginAttributes

    const resUser = await UserService.findById(userLogin.uid)
    const getUser = resUser.data?.data as UserEntity

    if (roles.includes(getUser.RoleId)) {
      const errType = `Not Permitted Access Error:`
      const message = 'You are not allowed'
      console.log(chalk.red(errType), chalk.green(message))

      const httpResponse = HttpResponse.get({
        code: 403,
        message: `${errType} ${message}`,
      })

      return res.status(403).json(httpResponse)
    }

    next()
  }
}

export default NotPermittedAccess
