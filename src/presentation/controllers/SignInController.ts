import { AuthenticationUseCase } from 'src/domain'

import { Controller, HttpRequest, MissingParamError, InvalidParamError, badRequest, serverError, unauthorized, ok } from 'src/presentation'

import { EmailValidator } from 'src/validation'

export class SignInController implements Controller {
  private readonly requiredFields = ['email', 'password']

  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authenticationUseCase: AuthenticationUseCase.UseCase
  ) { }

  async handle (httpRequest: HttpRequest) {
    try {
      for (const field of this.requiredFields) {
        if (!httpRequest?.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest?.body

      const isEmailValid = this.emailValidator.isValid(email)

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authenticationUseCase.auth({ email, password })

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (err) {
      return serverError(err)
    }
  }
}
