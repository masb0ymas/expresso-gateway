import { Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import BuildResponse from 'modules/Response/BuildResponse'
import routes from 'routes/public'
import User from 'controllers/User/service'
import Authorization from 'middlewares/Authorization'

const UserService = new User()

routes.get(
  '/user',
  asyncHandler(async function getAll(req: Request, res: Response) {
    const query = req.getQuery()

    const resData = await UserService.getAll(query)
    const { message, data, total } = resData.data
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/user/:id',
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const resData = await UserService.getOne(id)
    const { message, data } = resData.data
    const buildResponse = BuildResponse.get({ message, data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/user',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const resData = await UserService.create(formData)
    const { message, data } = resData.data
    const buildResponse = BuildResponse.created({ message, data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/user/:id',
  Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const formData = req.getBody()
    const { id } = req.getParams()

    const resData = await UserService.update(id, formData)
    const { message, data } = resData.data
    const buildResponse = BuildResponse.updated({ message, data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/user/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    const resData = await UserService.destroy(id)
    const { message } = resData.data
    const buildResponse = BuildResponse.deleted({ message })

    return res.status(200).json(buildResponse)
  })
)
