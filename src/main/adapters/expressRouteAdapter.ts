import { Request, Response } from 'express'

import { Controller } from '@/presentation/contracts/Controller'
import { HttpRequest } from '@/presentation/http/HttpRequest'

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }

    return res
      .status(httpResponse.statusCode)
      .json({ error: httpResponse.body?.message || httpResponse.body })
  }
}
