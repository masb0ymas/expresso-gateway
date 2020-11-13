import { Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import BuildResponse from 'modules/Response/BuildResponse'
import routes from 'routes/public'
import Role from 'controllers/Role/services'

const RoleService = new Role()

routes.get(
  '/role',
  asyncHandler(async function getAll(req: Request, res: Response) {
    const query = req.getQuery()

    const resData = await RoleService.getAll(query)
    const { message, data, total } = resData.data
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/role/:id',
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const resData = await RoleService.getOne(id)
    const { message, data } = resData.data
    const buildResponse = BuildResponse.get({ message, data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/role',
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const resData = await RoleService.create(formData)
    const { message, data } = resData.data
    const buildResponse = BuildResponse.created({ message, data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/role/:id',
  asyncHandler(async function updateData(req: Request, res: Response) {
    const formData = req.getBody()
    const { id } = req.getParams()

    const resData = await RoleService.update(formData, id)
    const { message, data } = resData.data
    const buildResponse = BuildResponse.updated({ message, data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/role/:id',
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    const resData = await RoleService.destroy(id)
    const { message } = resData.data
    const buildResponse = BuildResponse.deleted({ message })

    return res.status(200).json(buildResponse)
  })
)
