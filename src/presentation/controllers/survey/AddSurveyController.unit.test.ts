import { SurveyEntity } from '@/domain/entities/SurveyEntity'
import { AddSurveyUseCase } from '@/domain/usecases/AddSurveyUseCase'

import { AddSurveyController } from '@/presentation/controllers/survey/AddSurveyController'
import {
  badRequest,
  noContent,
  serverError,
} from '@/presentation/http/HttpResponse'

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
    async add(survey: SurveyEntity): Promise<void> {}
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

  it('should return 500 if AddSurveyUseCase throws', async () => {
    const { addSurveyUseCaseStub, sut } = makeSut()

    const httpRequest = {
      body: {
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }],
      },
    }

    jest
      .spyOn(addSurveyUseCaseStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 204 on success', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }],
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(noContent())
  })
})
