import { DbAddAccountUseCase } from 'src/data'

import {
  BcryptAdapter,
  MongoDbAccountRepository,
  MongoDbLogErrorRepository
} from 'src/infra'

import { ControllerWithLogDecorator } from 'src/main/decorators'
import { makeSignUpValidation } from 'src/main/factories'

import { Controller, SignUpController } from 'src/presentation'

export const makeSignUpController = (): Controller => {
  const hasher = new BcryptAdapter()
  const addAccountRepository = new MongoDbAccountRepository()
  const logErrorRepository = new MongoDbLogErrorRepository()

  const addAccountUseCase = new DbAddAccountUseCase(
    hasher,
    addAccountRepository
  )
  const validatorComposite = makeSignUpValidation()

  const signUpController = new SignUpController(
    addAccountUseCase,
    validatorComposite
  )

  return new ControllerWithLogDecorator(signUpController, logErrorRepository)
}
