import { MissingParamError } from 'src/presentation'

import { RequiredFieldValidator } from 'src/validation'

const makeSut = () => new RequiredFieldValidator('any_field')

describe('RequiredFieldValidator', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ any_other_field_name: 'any_other_field_value' })

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  it('should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({ any_field: 'any_field_value' })

    expect(error).toBeFalsy()
  })
})
