import { Validator } from '@/validation/contracts/Validator'
import { EmailValidator } from '@/validation/validators/EmailValidator'
import { RequiredFieldValidator } from '@/validation/validators/RequiredFieldValidator'
import { ValidatorComposite } from '@/validation/validators/ValidatorComposite'

export const makeSignInValidator = (): Validator => {
  const validatorComposite = new ValidatorComposite([
    new RequiredFieldValidator('email'),
    new RequiredFieldValidator('password'),
    new EmailValidator('email'),
  ])

  return validatorComposite
}
