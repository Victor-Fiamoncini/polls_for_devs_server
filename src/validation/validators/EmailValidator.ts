import { InvalidParamError } from 'src/presentation'

import { Validator } from 'src/validation'

export class EmailValidator implements Validator {
  private readonly emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!this.emailRegex.test(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
