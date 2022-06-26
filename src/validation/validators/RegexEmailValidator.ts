import { EmailValidator } from 'src/validation/contracts'

export class RegexEmailValidator implements EmailValidator {
  private readonly emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  isValid (email: string) {
    return this.emailRegex.test(email)
  }
}
