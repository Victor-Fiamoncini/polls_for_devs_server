import { SurveyModel } from '@/data/models/SurveyModel'
import { DbAddSurveyUseCase } from '@/data/usecases/DbAddSurveyUseCase'

import { AddSurveyRepository } from '../contracts/repositories/AddSurveyRepository'

const makeAddSurveyRepositoryStub = () => {
  class AddSurveyRepositoryStub implements AddSurveyRepository.Repository {
    async add(survey: SurveyModel): Promise<void> {}
  }

  return new AddSurveyRepositoryStub()
}

const makeSut = () => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurveyUseCase(addSurveyRepositoryStub)

  return {
    addSurveyRepositoryStub,
    sut,
  }
}

describe('DbAddSurveyUseCase', () => {
  it('should call AddSurveyRepository with correct params', async () => {
    const { addSurveyRepositoryStub, sut } = makeSut()

    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    const surveyData = {
      question: 'any_question',
      answers: [{ image: 'any_image', answer: 'any_answer' }],
    }

    await sut.add(surveyData)

    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
