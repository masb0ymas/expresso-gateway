import { type Request, type Response } from 'express'
import OpenStreetMapService from '~/app/service/osm.service'
import HttpResponse from '~/core/modules/response/HttpResponse'
import { asyncHandler } from '~/core/utils/asyncHandler'
import route from '~/routes/v1'

route.get(
  '/open-street-map/by-address',
  asyncHandler(async function getAddress(req: Request, res: Response) {
    const { q: address } = req.getQuery()

    const data = await OpenStreetMapService.getByAddress(address)

    const httpResponse = HttpResponse.get({ data })
    res.status(200).json(httpResponse)
  })
)

route.get(
  '/open-street-map/by-coordinate',
  asyncHandler(async function getCoordinate(req: Request, res: Response) {
    const { latitude, longitude } = req.getQuery()

    const data = await OpenStreetMapService.getByCoordinate(latitude, longitude)

    const httpResponse = HttpResponse.get({ data })
    res.status(200).json(httpResponse)
  })
)
