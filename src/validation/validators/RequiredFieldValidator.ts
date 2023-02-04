import { MissingParamError } from '@/presentation/errors/MissingParamError'

import { Validator } from '@/validation/contracts/Validator'

export class RequiredFieldValidator implements Validator {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
