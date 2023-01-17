import ConstRole from '@expresso/constants/ConstRole'
import asyncHandler from '@expresso/helpers/asyncHandler'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import Authorization from '@middlewares/Authorization'
import PermissionAccess from '@middlewares/PermissionAccess'
import route from '@routes/v1'
import { Request, Response } from 'express'
import RoleService from './service'

const onlyAdmin = [ConstRole.ID_ADMIN]

route.get(
  '/role',
  Authorization,
  asyncHandler(async function findAll(req: Request, res: Response) {
    const query = req.getQuery()

    const response = await RoleService.findAll(query)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.get(
  '/role/:id',
  Authorization,
  asyncHandler(async function findById(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await RoleService.findById(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.post(
  '/role',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await RoleService.create(formData)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.put(
  '/role/:id',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function update(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const response = await RoleService.update(id, formData)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.put(
  '/role/restore/:id',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function restore(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await RoleService.restore(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.delete(
  '/role/soft-delete/:id',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function softDelete(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await RoleService.softDelete(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.delete(
  '/role/force-delete/:id',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function forceDelete(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await RoleService.forceDelete(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.post(
  '/role/multiple/restore',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function multipleRestore(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await RoleService.multipleRestore(formData)

    const httpResponse = HttpResponse.updated(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.post(
  '/role/multiple/soft-delete',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function multipleSoftDelete(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await RoleService.multipleSoftDelete(formData)

    const httpResponse = HttpResponse.deleted(response.data)
    res.status(response.status).json(httpResponse)
  })
)

route.post(
  '/role/multiple/force-delete',
  Authorization,
  PermissionAccess(onlyAdmin),
  asyncHandler(async function multipleForceDelete(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await RoleService.multipleForceDelete(formData)

    const httpResponse = HttpResponse.deleted(response.data)
    res.status(response.status).json(httpResponse)
  })
)
