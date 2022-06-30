import { Request, Response } from 'express'

import { Controller, HttpRequest } from 'src/presentation'

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)

    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
