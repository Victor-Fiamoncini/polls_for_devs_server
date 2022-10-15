
import { Controller, HttpRequest, HttpResponse } from 'src/presentation'

export class SignInController implements Controller {
  private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      body: {},
      statusCode: 200
    }
  }
}
