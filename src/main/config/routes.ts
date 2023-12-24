import { Express, Router } from 'express'

import healthRoutes from '@/main/routes/healthRoutes'
import loginRoutes from '@/main/routes/loginRoutes'
import surveyRoutes from '@/main/routes/surveyRoutes'

export const initRoutes = (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  healthRoutes(router)
  loginRoutes(router)
  surveyRoutes(router)
}
