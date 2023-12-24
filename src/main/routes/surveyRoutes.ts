import { Router } from 'express'

import { expressRouteAdapter } from '@/main/adapters/expressRouteAdapter'
import { makeAddSurveyController } from '@/main/factories/survey/addSurveyControllerFactory'

export default (router: Router): void => {
  router.post('/surveys', expressRouteAdapter(makeAddSurveyController()))
}
