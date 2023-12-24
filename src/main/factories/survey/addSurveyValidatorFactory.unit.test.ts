import { makeAddSurveyValidator as sut } from '@/main/factories/survey/addSurveyValidatorFactory'

import { RequiredFieldValidator } from '@/validation/validators/RequiredFieldValidator'
import { ValidatorComposite } from '@/validation/validators/ValidatorComposite'

jest.mock('@/validation/validators/ValidatorComposite')

describe('addSurveyValidatorFactory', () => {
  it('should call ValidatorComposite with all validators', () => {
    sut()

    expect(ValidatorComposite).toHaveBeenCalledWith([
      new RequiredFieldValidator('question'),
      new RequiredFieldValidator('answers'),
    ])
  })
})
