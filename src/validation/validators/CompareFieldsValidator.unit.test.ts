import { InvalidParamError } from '@/presentation/errors/InvalidParamError'

import { CompareFieldsValidator } from '@/validation/validators/CompareFieldsValidator'

const makeSut = () =>
  new CompareFieldsValidator('any_field', 'any_field_to_compare')

describe('CompareFieldsValidator', () => {
  it('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({
      any_field: 'any_field_value',
      any_field_to_compare: 'any_other_value',
    })

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  it('should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({
      any_field: 'any_field_value',
      any_field_to_compare: 'any_field_value',
    })

    expect(error).toBeFalsy()
  })
})
