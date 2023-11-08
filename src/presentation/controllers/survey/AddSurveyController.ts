import { AddSurveyUseCase } from '@/domain/usecases/AddSurveyUseCase'

import { Controller } from '@/presentation/contracts/Controller'
import { HttpRequest } from '@/presentation/http/HttpRequest'
import {
  HttpResponse,
  badRequest,
  serverError,
} from '@/presentation/http/HttpResponse'

import { Validator } from '@/validation/contracts/Validator'

export class AddSurveyController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly addSurveyUseCase: AddSurveyUseCase.UseCase
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)

      if (error) return badRequest(error)

      const { question, answers } = httpRequest.body

      await this.addSurveyUseCase.add({ question, answers })
    } catch (err) {
      return serverError(err)
    }
  }
}
