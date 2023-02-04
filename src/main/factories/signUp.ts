import { DbAddAccountUseCase } from '@/data/usecases/DbAddAccountUseCase'

import { BcryptAdapter } from '@/infra/hash/BcryptAdapter'
import { MongoDbAccountRepository } from '@/infra/mongodb/MongoDbAccountRepository'
import { MongoDbLogErrorRepository } from '@/infra/mongodb/MongoDbLogErrorRepository'

import { ControllerWithLogDecorator } from '@/main/decorators/ControllerWithLogDecorator'
import { makeSignUpValidation } from '@/main/factories/signUpValidation'

import { Controller } from '@/presentation/contracts/Controller'
import { SignUpController } from '@/presentation/controllers/SignUpController'

export const makeSignUpController = (): Controller => {
  const hasher = new BcryptAdapter()
  const addAccountRepository = new MongoDbAccountRepository()
  const logErrorRepository = new MongoDbLogErrorRepository()

  const addAccountUseCase = new DbAddAccountUseCase(hasher, addAccountRepository)
  const validatorComposite = makeSignUpValidation()

  const signUpController = new SignUpController(addAccountUseCase, validatorComposite)

  return new ControllerWithLogDecorator(signUpController, logErrorRepository)
}
