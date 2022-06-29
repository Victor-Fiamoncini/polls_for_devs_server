import { Express } from 'express'

import { bodyParser } from 'src/main/middlewares'

export const initMiddlewares = (app: Express): void => {
  app.use(bodyParser)
}
