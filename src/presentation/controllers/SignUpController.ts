import { badRequest, Controller, EmailValidator, HttpRequest, InvalidParamError, MissingParamError } from 'src/presentation'

export class SignUpController implements Controller {
  private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest) {
    for (const field of this.requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
