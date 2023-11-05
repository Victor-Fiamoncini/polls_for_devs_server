import { AddAccountUseCase } from '@/domain/usecases/AddAccountUseCase'
import { AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'

import { Controller } from '@/presentation/contracts/Controller'
import { HttpRequest } from '@/presentation/http/HttpRequest'
import {
  badRequest,
  forbidden,
  HttpResponse,
  ok,
  serverError,
} from '@/presentation/http/HttpResponse'

import { Validator } from '@/validation/contracts/Validator'

import { EmailAlreadyUsedError } from '../errors/EmailAlreadyUsedError'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccountUseCase: AddAccountUseCase.UseCase,
    private readonly validator: Validator,
    private readonly authenticationUseCase: AuthenticationUseCase.UseCase
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest?.body)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccountUseCase.add({
        email,
        name,
        password,
      })

      if (!account) {
        return forbidden(new EmailAlreadyUsedError(email))
      }

      const accessToken = await this.authenticationUseCase.auth({
        email,
        password,
      })

      return ok({ accessToken })
    } catch (err) {
      return serverError(err)
    }
  }
}
