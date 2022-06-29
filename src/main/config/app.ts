import express from 'express'

import { initMiddlewares } from 'src/main/config/middlewares'

const app = express()

initMiddlewares(app)

export { app }
