import { InvalidParamError } from '@/presentation/errors/InvalidParamError'

import { Validator } from '@/validation/contracts/Validator'

export class CompareFieldsValidator implements Validator {
  constructor(
    private readonly fieldName: string,
    private readonly fieldNameToCompare: string
  ) {}

  validate(input: any): Error {
    if (input[this.fieldName] !== input[this.fieldNameToCompare]) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
