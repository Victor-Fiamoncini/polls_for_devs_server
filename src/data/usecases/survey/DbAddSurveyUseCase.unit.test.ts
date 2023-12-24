import { AddSurveyRepository } from '@/data/contracts/repositories/AddSurveyRepository'
import { SurveyModel } from '@/data/models/SurveyModel'
import { DbAddSurveyUseCase } from '@/data/usecases/survey/DbAddSurveyUseCase'

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

  it('should throw if AddSurveyRepository throws', async () => {
    const { addSurveyRepositoryStub, sut } = makeSut()

    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const surveyData = {
      question: 'any_question',
      answers: [{ image: 'any_image', answer: 'any_answer' }],
    }

    const addPromise = sut.add(surveyData)

    await expect(addPromise).rejects.toThrow()
  })
})