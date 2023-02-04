import { LogErrorRepository } from '@/data/contracts/repositories/LogErrorRepository'

import { Controller } from '@/presentation/contracts/Controller'
import { HttpRequest } from '@/presentation/http/HttpRequest'
import { HttpResponse } from '@/presentation/http/HttpResponse'

export class ControllerWithLogDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }

    return httpResponse
  }
}
