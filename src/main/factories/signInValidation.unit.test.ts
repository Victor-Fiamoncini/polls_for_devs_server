import { makeSignInValidation as sut } from 'src/main/factories'

import { EmailValidator, RequiredFieldValidator, ValidatorComposite } from 'src/validation'

jest.mock('src/validation/validators/ValidatorComposite')

describe('signInValidation', () => {
  it('should call ValidatorComposite with all validators', () => {
    sut()

    expect(ValidatorComposite).toHaveBeenCalledWith([
      new RequiredFieldValidator('email'),
      new RequiredFieldValidator('password'),
      new EmailValidator('email')
    ])
  })
})
