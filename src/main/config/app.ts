import express from 'express'

import { initMiddlewares } from '@/main/config/middlewares'
import { initRoutes } from '@/main/config/routes'

const app = express()

initMiddlewares(app)
initRoutes(app)

export { app }
