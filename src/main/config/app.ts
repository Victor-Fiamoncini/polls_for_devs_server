import express from 'express'

import { initMiddlewares } from 'src/main/config/middlewares'
import { initRoutes } from 'src/main/config/routes'

const app = express()

initMiddlewares(app)
initRoutes(app)

export { app }
