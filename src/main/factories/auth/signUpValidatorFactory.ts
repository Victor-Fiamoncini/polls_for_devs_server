import { Validator } from '@/validation/contracts/Validator'
import { CompareFieldsValidator } from '@/validation/validators/CompareFieldsValidator'
import { EmailValidator } from '@/validation/validators/EmailValidator'
import { RequiredFieldValidator } from '@/validation/validators/RequiredFieldValidator'
import { ValidatorComposite } from '@/validation/validators/ValidatorComposite'

export const makeSignUpValidator = (): Validator => {
  const validatorComposite = new ValidatorComposite([
    new RequiredFieldValidator('name'),
    new RequiredFieldValidator('email'),
    new RequiredFieldValidator('password'),
    new RequiredFieldValidator('passwordConfirmation'),
    new CompareFieldsValidator('password', 'passwordConfirmation'),
    new EmailValidator('email'),
  ])

  return validatorComposite
}
