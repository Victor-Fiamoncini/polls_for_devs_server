import { CompareFieldsValidator, EmailValidator, RequiredFieldValidator, Validator, ValidatorComposite } from 'src/validation'

export const makeSignUpValidation = (): Validator => {
  const validatorComposite = new ValidatorComposite([
    new RequiredFieldValidator('name'),
    new RequiredFieldValidator('email'),
    new RequiredFieldValidator('password'),
    new RequiredFieldValidator('passwordConfirmation'),
    new CompareFieldsValidator('password', 'passwordConfirmation'),
    new EmailValidator('email')
  ])

  return validatorComposite
}
