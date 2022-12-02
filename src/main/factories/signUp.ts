import { DbAddAccountUseCase } from 'src/data'

import { BcryptEncrypter, MongoDbAccountRepository, MongoDbLogErrorRepository } from 'src/infra'

import { ControllerWithLogDecorator } from 'src/main/decorators'
import { makeSignUpValidation } from 'src/main/factories'

import { Controller, SignUpController } from 'src/presentation'

import { RegexEmailValidator } from 'src/validation'

export const makeSignUpController = (): Controller => {
  const encrypter = new BcryptEncrypter()
  const addAccountRepository = new MongoDbAccountRepository()
  const logErrorRepository = new MongoDbLogErrorRepository()

  const emailValidator = new RegexEmailValidator()
  const addAccountUseCase = new DbAddAccountUseCase(encrypter, addAccountRepository)

  const validatorComposite = makeSignUpValidation()

  const signUpController = new SignUpController(emailValidator, addAccountUseCase, validatorComposite)

  return new ControllerWithLogDecorator(signUpController, logErrorRepository)
}
