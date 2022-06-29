import { Express } from 'express'

import { bodyParser, cors } from 'src/main/middlewares'

export const initMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
