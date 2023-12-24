import { makeSignUpValidator as sut } from '@/main/factories/auth/signUpValidatorFactory'

import { CompareFieldsValidator } from '@/validation/validators/CompareFieldsValidator'
import { EmailValidator } from '@/validation/validators/EmailValidator'
import { RequiredFieldValidator } from '@/validation/validators/RequiredFieldValidator'
import { ValidatorComposite } from '@/validation/validators/ValidatorComposite'

jest.mock('@/validation/validators/ValidatorComposite')

describe('signUpValidatorFactory', () => {
  it('should call ValidatorComposite with all validators', () => {
    sut()

    expect(ValidatorComposite).toHaveBeenCalledWith([
      new RequiredFieldValidator('name'),
      new RequiredFieldValidator('email'),
      new RequiredFieldValidator('password'),
      new RequiredFieldValidator('passwordConfirmation'),
      new CompareFieldsValidator('password', 'passwordConfirmation'),
      new EmailValidator('email'),
    ])
  })
})
