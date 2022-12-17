import { Router } from 'express'

import { expressRouteAdapter } from 'src/main/adapters'
import { makeSignInController, makeSignUpController } from 'src/main/factories'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))

  router.post('/signin', expressRouteAdapter(makeSignInController()))
}
