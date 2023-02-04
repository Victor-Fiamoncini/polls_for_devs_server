import { makeSignInValidation as sut } from '@/main/factories/signInValidation'

import { EmailValidator } from '@/validation/validators/EmailValidator'
import { RequiredFieldValidator } from '@/validation/validators/RequiredFieldValidator'
import { ValidatorComposite } from '@/validation/validators/ValidatorComposite'

jest.mock('@/validation/validators/ValidatorComposite')

describe('signInValidation', () => {
  it('should call ValidatorComposite with all validators', () => {
    sut()

    expect(ValidatorComposite).toHaveBeenCalledWith([
      new RequiredFieldValidator('email'),
      new RequiredFieldValidator('password'),
      new EmailValidator('email'),
    ])
  })
})
