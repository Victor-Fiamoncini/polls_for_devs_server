import { InvalidParamError } from 'src/presentation'

import { Validator } from 'src/validation'

export class CompareFieldsValidator implements Validator {
  constructor (
    private readonly fieldName: string,
    private readonly fieldNameToCompare: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldNameToCompare]) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
