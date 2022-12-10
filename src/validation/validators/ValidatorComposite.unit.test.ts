import { InvalidParamError, MissingParamError } from 'src/presentation'

import { ValidatorComposite, Validator } from 'src/validation'

const makeValidatorStub = () => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidatorStub()
}

const makeSut = () => {
  const validatorStubs = [makeValidatorStub(), makeValidatorStub()]
  const sut = new ValidatorComposite(validatorStubs)

  return {
    validatorStubs,
    sut
  }
}

describe('ValidatorComposite', () => {
  it('should return an error if any validation fails', () => {
    const { validatorStubs, sut } = makeSut()

    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const error = sut.validate({ any_field: 'any_field_value' })

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  it('should return the first error if more than one validation fails', () => {
    const { validatorStubs, sut } = makeSut()

    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new InvalidParamError('any_field'))
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const error = sut.validate({ any_field: 'any_field_value' })

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  it('should not return if all validations succeeds', () => {
    const { sut } = makeSut()

    const error = sut.validate({ any_field: 'any_field_value' })

    expect(error).toBeFalsy()
  })
})
