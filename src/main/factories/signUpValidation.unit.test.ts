import { makeSignUpValidation as sut } from 'src/main/factories'

import { CompareFieldsValidator, EmailValidator, RequiredFieldValidator, ValidatorComposite } from 'src/validation'

jest.mock('src/validation/validators/ValidatorComposite')

describe('signUpValidation', () => {
  it('should call ValidatorComposite with all validators', () => {
    sut()

    expect(ValidatorComposite).toHaveBeenCalledWith([
      new RequiredFieldValidator('name'),
      new RequiredFieldValidator('email'),
      new RequiredFieldValidator('password'),
      new RequiredFieldValidator('passwordConfirmation'),
      new CompareFieldsValidator('password', 'passwordConfirmation'),
      new EmailValidator('email')
    ])
  })
})