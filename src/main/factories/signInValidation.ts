import { EmailValidator, RequiredFieldValidator, Validator, ValidatorComposite } from 'src/validation'

export const makeSignInValidation = (): Validator => {
  const validatorComposite = new ValidatorComposite([
    new RequiredFieldValidator('email'),
    new RequiredFieldValidator('password'),
    new EmailValidator('email')
  ])

  return validatorComposite
}
