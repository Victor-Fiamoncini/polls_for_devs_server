import { Express, Router } from 'express'
import fg from 'fast-glob'

export const initRoutes = (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  fg.sync('**/src/main/routes/**Routes.ts').map(async routeFilePath => {
    const routeFile = (await import(`../../../${routeFilePath}`)).default

    routeFile(router)
  })
}
