import asyncHandler from '@expresso/helpers/asyncHandler'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import Authorization from '@middlewares/Authorization'
import route from '@routes/v1'
import { Request, Response } from 'express'
import NotificationService from './service'

route.get(
  '/notification',
  Authorization,
  asyncHandler(async function findAll(req: Request, res: Response) {
    const query = req.getQuery()

    const response = await NotificationService.findAll(query)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.get(
  '/notification/:id',
  Authorization,
  asyncHandler(async function findById(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await NotificationService.findById(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.post(
  '/notification',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()

    const response = await NotificationService.create(formData)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.put(
  '/notification/:id',
  Authorization,
  asyncHandler(async function update(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const response = await NotificationService.update(id, formData)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.put(
  '/notification/restore/:id',
  Authorization,
  asyncHandler(async function restore(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await NotificationService.restore(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.delete(
  '/notification/soft-delete/:id',
  Authorization,
  asyncHandler(async function softDelete(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await NotificationService.softDelete(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)

route.delete(
  '/notification/force-delete/:id',
  Authorization,
  asyncHandler(async function forceDelete(req: Request, res: Response) {
    const { id } = req.getParams()

    const response = await NotificationService.forceDelete(id)

    const httpResponse = HttpResponse.get(response.data)
    res.status(200).json(httpResponse)
  })
)
