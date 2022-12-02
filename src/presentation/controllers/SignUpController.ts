import { AddAccountUseCase } from 'src/domain'

import { Controller, InvalidParamError, badRequest, created, HttpRequest, serverError } from 'src/presentation'

import { EmailValidator, Validator } from 'src/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccountUseCase: AddAccountUseCase.UseCase,
    private readonly validator: Validator
  ) { }

  async handle (httpRequest: HttpRequest) {
    try {
      const error = this.validator.validate(httpRequest?.body)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password, passwordConfirmation } = httpRequest?.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isEmailValid = this.emailValidator.isValid(email)

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccountUseCase.add({ email, name, password })

      return created(account)
    } catch (err) {
      return serverError(err)
    }
  }
}
