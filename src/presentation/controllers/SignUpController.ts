import { badRequest, HttpRequest, HttpResponse, MissingParamError } from 'src/presentation'

export class SignUpController {
  private readonly requiredFields = ['name', 'email']

  handle (httpRequest: HttpRequest): HttpResponse {
    for (const field of this.requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
