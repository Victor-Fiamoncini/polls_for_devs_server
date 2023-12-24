import { DbAddSurveyUseCase } from '@/data/usecases/survey/DbAddSurveyUseCase'

import { AddSurveyUseCase } from '@/domain/usecases/AddSurveyUseCase'

import { MongoDbSurveyRepository } from '@/infra/mongodb/MongoDbSurveyRepository'

export const makeAddSurveyUseCase = (): AddSurveyUseCase.UseCase => {
  const surveyRepository = new MongoDbSurveyRepository()

  return new DbAddSurveyUseCase(surveyRepository)
}
