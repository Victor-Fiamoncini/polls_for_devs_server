import { Router } from 'express'

import { expressRouteAdapter } from '@/main/adapters/expressRouteAdapter'
import { makeSignInController } from '@/main/factories/signIn'
import { makeSignUpController } from '@/main/factories/signUp'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))

  router.post('/signin', expressRouteAdapter(makeSignInController()))
}
