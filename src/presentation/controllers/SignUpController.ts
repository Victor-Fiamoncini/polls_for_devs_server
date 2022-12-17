import { AddAccountUseCase } from 'src/domain'

import { Controller, badRequest, created, HttpRequest, serverError, HttpResponse } from 'src/presentation'

import { Validator } from 'src/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccountUseCase: AddAccountUseCase.UseCase,
    private readonly validator: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest?.body)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest?.body

      const account = await this.addAccountUseCase.add({ email, name, password })

      return created(account)
    } catch (err) {
      return serverError(err)
    }
  }
}
