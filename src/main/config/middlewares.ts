import { Express } from 'express'

import { bodyParser, contentType, cors } from 'src/main/middlewares'

export const initMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}
