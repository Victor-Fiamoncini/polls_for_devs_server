import { Express } from 'express'

import { bodyParser } from '@/main/middlewares/bodyParser'
import { contentType } from '@/main/middlewares/contentType'
import { cors } from '@/main/middlewares/cors'

export const initMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}
