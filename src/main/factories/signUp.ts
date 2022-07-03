import { DbAddAccountUseCase } from 'src/data'

import { BcryptEncrypter, MongoDbAccountRepository } from 'src/infra'

import { ControllerWithLogDecorator } from 'src/main/decorators'

import { Controller, SignUpController } from 'src/presentation'

import { RegexEmailValidator } from 'src/validation'

export const makeSignUpController = (): Controller => {
  const encrypter = new BcryptEncrypter()
  const addAccountRepository = new MongoDbAccountRepository()

  const emailValidator = new RegexEmailValidator()
  const addAccountUseCase = new DbAddAccountUseCase(encrypter, addAccountRepository)

  const signUpController = new SignUpController(emailValidator, addAccountUseCase)

  return new ControllerWithLogDecorator(signUpController)
}
