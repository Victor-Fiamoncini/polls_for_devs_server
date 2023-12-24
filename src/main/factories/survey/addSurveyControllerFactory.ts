import { makeLogControllerDecorator } from '@/main/factories/log/logControllerDecoratorFactory'
import { makeAddSurveyUseCase } from '@/main/factories/survey/addSurveyUseCaseFactory'
import { makeAddSurveyValidator } from '@/main/factories/survey/addSurveyValidatorFactory'

import { Controller } from '@/presentation/contracts/Controller'
import { AddSurveyController } from '@/presentation/controllers/survey/AddSurveyController'

export const makeAddSurveyController = (): Controller => {
  const addSurveyUseCase = makeAddSurveyUseCase()
  const validatorComposite = makeAddSurveyValidator()

  const signInController = new AddSurveyController(
    validatorComposite,
    addSurveyUseCase
  )

  return makeLogControllerDecorator(signInController)
}
