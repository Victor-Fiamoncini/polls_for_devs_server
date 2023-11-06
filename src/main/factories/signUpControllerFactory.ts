import { DbAddAccountUseCase } from '@/data/usecases/DbAddAccountUseCase'

import { BcryptAdapter } from '@/infra/hash/BcryptAdapter'
import { MongoDbAccountRepository } from '@/infra/mongodb/MongoDbAccountRepository'

import { makeAuthenticationUseCase } from '@/main/factories/authenticationUseCaseFactory'
import { makeLogControllerDecorator } from '@/main/factories/logControllerDecoratorFactory'
import { makeSignUpValidator } from '@/main/factories/signUpValidatorFactory'

import { Controller } from '@/presentation/contracts/Controller'
import { SignUpController } from '@/presentation/controllers/SignUpController'

export const makeSignUpController = (): Controller => {
  const hasher = new BcryptAdapter()
  const accountRepository = new MongoDbAccountRepository()

  const addAccountUseCase = new DbAddAccountUseCase(hasher, accountRepository)
  const validatorComposite = makeSignUpValidator()
  const authenticationUseCase = makeAuthenticationUseCase()

  const signUpController = new SignUpController(
    addAccountUseCase,
    validatorComposite,
    authenticationUseCase
  )

  return makeLogControllerDecorator(signUpController)
}
