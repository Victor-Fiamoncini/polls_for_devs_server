import { DbAddAccountUseCase } from 'src/data'

import { BcryptEncrypter, MongoDbAccountRepository } from 'src/infra'

import { SignUpController } from 'src/presentation'

import { RegexEmailValidator } from 'src/validation'

export const makeSignUpController = (): SignUpController => {
  const encrypter = new BcryptEncrypter()
  const addAccountRepository = new MongoDbAccountRepository()

  const emailValidator = new RegexEmailValidator()
  const addAccountUseCase = new DbAddAccountUseCase(encrypter, addAccountRepository)

  return new SignUpController(emailValidator, addAccountUseCase)
}
