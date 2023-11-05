import { DbAddAccountUseCase } from '@/data/usecases/DbAddAccountUseCase'
import { DbAuthenticationUseCase } from '@/data/usecases/DbAuthenticationUseCase'

import { JwtAdapter } from '@/infra/encrypt/JwtAdapter'
import { BcryptAdapter } from '@/infra/hash/BcryptAdapter'
import { MongoDbAccountRepository } from '@/infra/mongodb/MongoDbAccountRepository'
import { MongoDbLogErrorRepository } from '@/infra/mongodb/MongoDbLogErrorRepository'

import { env } from '@/main/config/env'
import { ControllerWithLogDecorator } from '@/main/decorators/ControllerWithLogDecorator'
import { makeSignUpValidator } from '@/main/factories/signUpValidatorFactory'

import { Controller } from '@/presentation/contracts/Controller'
import { SignUpController } from '@/presentation/controllers/SignUpController'

export const makeSignUpController = (): Controller => {
  const hasher = new BcryptAdapter()
  const encrypter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new MongoDbAccountRepository()
  const logErrorRepository = new MongoDbLogErrorRepository()

  const addAccountUseCase = new DbAddAccountUseCase(hasher, accountRepository)
  const validatorComposite = makeSignUpValidator()
  const authenticationUseCase = new DbAuthenticationUseCase(
    accountRepository,
    hasher,
    encrypter,
    accountRepository
  )

  const signUpController = new SignUpController(
    addAccountUseCase,
    validatorComposite,
    authenticationUseCase
  )

  return new ControllerWithLogDecorator(signUpController, logErrorRepository)
}
