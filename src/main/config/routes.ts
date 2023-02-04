import { Express, Router } from 'express'

import loginRoutes from '@/main/routes/loginRoutes'

export const initRoutes = (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  loginRoutes(router)
}
