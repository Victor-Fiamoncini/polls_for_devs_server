import { AddSurveyUseCase } from '@/domain/usecases/AddSurveyUseCase'

import { AddSurveyController } from '@/presentation/controllers/survey/AddSurveyController'
import { badRequest } from '@/presentation/http/HttpResponse'

import { Validator } from '@/validation/contracts/Validator'

const makeValidatorStub = () => {
  class ValidatorStub implements Validator {
    validate(input: any): Error {
      return null
    }
  }

  return new ValidatorStub()
}

const makeAddSurveyUseCaseStub = () => {
  class AddSurveyUseCaseStub implements AddSurveyUseCase.UseCase {
    async add(survey: AddSurveyUseCase.Params): Promise<void> {}
  }

  return new AddSurveyUseCaseStub()
}

const makeSut = () => {
  const validatorStub = makeValidatorStub()
  const addSurveyUseCaseStub = makeAddSurveyUseCaseStub()
  const sut = new AddSurveyController(validatorStub, addSurveyUseCaseStub)

  return {
    validatorStub,
    addSurveyUseCaseStub,
    sut,
  }
}

describe('AddSurveyController', () => {
  it('should call Validator with correct values', async () => {
    const { validatorStub, sut } = makeSut()

    const httpRequest = {
      body: {
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }],
      },
    }

    const validateSpy = jest.spyOn(validatorStub, 'validate')

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if Validator fails', async () => {
    const { validatorStub, sut } = makeSut()

    const httpRequest = {
      body: {
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }],
      },
    }

    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('should call AddSurveyUseCase with correct values', async () => {
    const { addSurveyUseCaseStub, sut } = makeSut()

    const httpRequest = {
      body: {
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }],
      },
    }

    const addSpy = jest.spyOn(addSurveyUseCaseStub, 'add')

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
