import { AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'

import { Controller } from '@/presentation/contracts/Controller'
import { HttpRequest } from '@/presentation/http/HttpRequest'
import {
  badRequest,
  HttpResponse,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/http/HttpResponse'

import { Validator } from '@/validation/contracts/Validator'

export class SignInController implements Controller {
  constructor(
    private readonly authenticationUseCase: AuthenticationUseCase.UseCase,
    private readonly validator: Validator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest?.body)

      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const accessToken = await this.authenticationUseCase.auth({
        email,
        password,
      })

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (err) {
      return serverError(err)
    }
  }
}
