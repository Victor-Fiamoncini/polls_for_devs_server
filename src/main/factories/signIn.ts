import { DbAuthenticationUseCase } from 'src/data'

import {
  BcryptAdapter,
  JwtAdapter,
  MongoDbAccountRepository,
  MongoDbLogErrorRepository
} from 'src/infra'

import { env } from 'src/main/config/env'
import { ControllerWithLogDecorator } from 'src/main/decorators'
import { makeSignInValidation } from 'src/main/factories'

import { Controller, SignInController } from 'src/presentation'

export const makeSignInController = (): Controller => {
  const logErrorRepository = new MongoDbLogErrorRepository()

  const accountRepository = new MongoDbAccountRepository()
  const hashComparator = new BcryptAdapter()
  const encrypter = new JwtAdapter(env.jwtSecret)

  const authenticationUseCase = new DbAuthenticationUseCase(
    accountRepository,
    hashComparator,
    encrypter,
    accountRepository
  )
  const validatorComposite = makeSignInValidation()

  const signInController = new SignInController(
    authenticationUseCase,
    validatorComposite
  )

  return new ControllerWithLogDecorator(signInController, logErrorRepository)
}
