import { AddAccountUseCase } from 'src/domain'

import { Controller, EmailValidator } from 'src/presentation/contracts'
import { InvalidParamError, MissingParamError } from 'src/presentation/errors'
import { badRequest, HttpRequest, serverError } from 'src/presentation/http'

export class SignUpController implements Controller {
  private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccountUseCase: AddAccountUseCase
  ) { }

  handle (httpRequest: HttpRequest) {
    try {
      for (const field of this.requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isEmailValid = this.emailValidator.isValid(email)

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccountUseCase.add({ email, name, password })
    } catch {
      return serverError()
    }
  }
}
