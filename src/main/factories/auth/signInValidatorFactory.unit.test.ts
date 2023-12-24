import { makeSignInValidator as sut } from '@/main/factories/auth/signInValidatorFactory'

import { EmailValidator } from '@/validation/validators/EmailValidator'
import { RequiredFieldValidator } from '@/validation/validators/RequiredFieldValidator'
import { ValidatorComposite } from '@/validation/validators/ValidatorComposite'

jest.mock('@/validation/validators/ValidatorComposite')

describe('signInValidatorFactory', () => {
  it('should call ValidatorComposite with all validators', () => {
    sut()

    expect(ValidatorComposite).toHaveBeenCalledWith([
      new RequiredFieldValidator('email'),
      new RequiredFieldValidator('password'),
      new EmailValidator('email'),
    ])
  })
})
