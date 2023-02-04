import { DbAuthenticationUseCase } from '@/data/usecases/DbAuthenticationUseCase'

import { JwtAdapter } from '@/infra/encrypt/JwtAdapter'
import { BcryptAdapter } from '@/infra/hash/BcryptAdapter'
import { MongoDbAccountRepository } from '@/infra/mongodb/MongoDbAccountRepository'
import { MongoDbLogErrorRepository } from '@/infra/mongodb/MongoDbLogErrorRepository'

import { env } from '@/main/config/env'
import { ControllerWithLogDecorator } from '@/main/decorators/ControllerWithLogDecorator'
import { makeSignInValidation } from '@/main/factories/signInValidation'

import { Controller } from '@/presentation/contracts/Controller'
import { SignInController } from '@/presentation/controllers/SignInController'

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

  const signInController = new SignInController(authenticationUseCase, validatorComposite)

  return new ControllerWithLogDecorator(signInController, logErrorRepository)
}
