import { EmailValidator } from 'src/validation/contracts'

export class RegexEmailValidator implements EmailValidator {
  isValid (email: string) {
    return false
  }
}
