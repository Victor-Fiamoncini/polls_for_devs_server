import { Validator } from '@/validation/contracts/Validator'
import { RequiredFieldValidator } from '@/validation/validators/RequiredFieldValidator'
import { ValidatorComposite } from '@/validation/validators/ValidatorComposite'

export const makeAddSurveyValidator = (): Validator => {
  return new ValidatorComposite([
    new RequiredFieldValidator('question'),
    new RequiredFieldValidator('answers'),
  ])
}
