import { Controller, HttpRequest, HttpResponse } from 'src/presentation'

export class ControllerWithLogDecorator implements Controller {
  constructor (private readonly controller: Controller) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    return httpResponse
  }
}
