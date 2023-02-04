import { AddAccountUseCase } from '@/domain/usecases/AddAccountUseCase'

import { Controller } from '@/presentation/contracts/Controller'
import { HttpRequest } from '@/presentation/http/HttpRequest'
import {
  badRequest,
  created,
  HttpResponse,
  serverError,
} from '@/presentation/http/HttpResponse'

import { Validator } from '@/validation/contracts/Validator'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccountUseCase: AddAccountUseCase.UseCase,
    private readonly validator: Validator
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

      return created(account)
    } catch (err) {
      return serverError(err)
    }
  }
}
