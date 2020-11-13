import { Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import BuildResponse from 'modules/Response/BuildResponse'
import routes from 'routes/public'
import Role from 'controllers/Role/services'

const RoleService = new Role()

routes.get(
  '/role',
  asyncHandler(async function getPosts(req: Request, res: Response) {
    const query = req.getQuery()

    const resData = await RoleService.getAll(query)
    const { message, data, total } = resData.data
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/role/:id',
  asyncHandler(async function getPosts(req: Request, res: Response) {
    const { id } = req.getParams()

    const resData = await RoleService.getOne(id)
    console.log(resData)

    const { message, data } = resData.data
    const buildResponse = BuildResponse.get({ message, data })

    return res.status(200).json(buildResponse)
  })
)
