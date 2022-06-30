import { Router } from 'express'

import { expressRouteAdapter } from 'src/main/adapters'
import { makeSignUpController } from 'src/main/factories'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
}
