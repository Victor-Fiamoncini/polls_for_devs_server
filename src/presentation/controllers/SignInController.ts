import { AuthenticationUseCase } from 'src/domain'

import { Controller, HttpRequest, badRequest, serverError, unauthorized, ok } from 'src/presentation'

import { Validator } from 'src/validation'

export class SignInController implements Controller {
  constructor (
    private readonly authenticationUseCase: AuthenticationUseCase.UseCase,
    private readonly validator: Validator
  ) { }

  async handle (httpRequest: HttpRequest) {
    try {
      const error = this.validator.validate(httpRequest?.body)

      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest?.body

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
