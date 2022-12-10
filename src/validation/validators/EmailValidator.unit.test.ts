import { InvalidParamError } from 'src/presentation'

import { EmailValidator } from 'src/validation'

const makeSut = () => new EmailValidator('any_field')

describe('EmailValidator', () => {
  it('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ any_field: 'invalid_email_value' })

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  it('should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({ any_field: 'correct_email_value@mail.com' })

    expect(error).toBeFalsy()
  })
})
