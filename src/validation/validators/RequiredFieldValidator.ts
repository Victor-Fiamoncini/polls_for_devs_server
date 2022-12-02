import { MissingParamError } from 'src/presentation'

import { Validator } from 'src/validation'

export class RequiredFieldValidator implements Validator {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
