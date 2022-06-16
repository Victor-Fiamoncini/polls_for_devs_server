import { badRequest, Controller, HttpRequest, MissingParamError } from 'src/presentation'

export class SignUpController implements Controller {
  private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

  handle (httpRequest: HttpRequest) {
    for (const field of this.requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
