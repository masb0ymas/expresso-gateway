import ConstRole from '@expresso/constants/ConstRole'
import asyncHandler from '@expresso/helpers/asyncHandler'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import Authorization from '@middlewares/Authorization'
import PermissionAccess from '@middlewares/PermissionAccess'
import route from '@routes/v1'
import { Request, Response } from 'express'
import UserService from './service'

const onlyAdmin = [ConstRole.ID_ADMIN]

route.get(
  '/user',
  Authorization,
  asyncHandler(async function findAll(req: Request, res: Response) {
    const query = req.getQuery()

    const response = await UserService.findAll(query)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.get(
  '/user/:id',
  Authorization,
  asyncHandler(async function findById(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await UserService.findById(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.post(
  '/user',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await UserService.create(formData)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.put(
  '/user/:id',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function update(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const response = await UserService.update(id, formData)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.put(
  '/user/restore/:id',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function restore(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await UserService.restore(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.delete(
  '/user/soft-delete/:id',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function softDelete(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await UserService.softDelete(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.delete(
  '/user/force-delete/:id',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function forceDelete(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await UserService.forceDelete(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.post(
  '/user/multiple/restore',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function multipleRestore(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await UserService.multipleRestore(formData)

    const httpResponse = HttpResponse.updated(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.post(
  '/user/multiple/soft-delete',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function multipleSoftDelete(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await UserService.multipleSoftDelete(formData)

    const httpResponse = HttpResponse.deleted(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.post(
  '/user/multiple/force-delete',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function multipleForceDelete(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await UserService.multipleForceDelete(formData)

    const httpResponse = HttpResponse.deleted(response.data)
    res.status(response.status).json(httpResponse)
  })
)
