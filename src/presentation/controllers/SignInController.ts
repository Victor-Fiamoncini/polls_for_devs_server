import { Controller, HttpRequest, MissingParamError, InvalidParamError, badRequest } from 'src/presentation'

import { EmailValidator } from 'src/validation'

export class SignInController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest) {
    const { email, password } = httpRequest?.body

    if (!email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!password) {
      return badRequest(new MissingParamError('password'))
    }

    const isEmailValid = this.emailValidator.isValid(email)

    if (!isEmailValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
