import { LogErrorRepository } from '@/data/contracts/repositories/LogErrorRepository'

import { ControllerWithLogDecorator } from '@/main/decorators/ControllerWithLogDecorator'

import { Controller } from '@/presentation/contracts/Controller'
import { HttpRequest } from '@/presentation/http/HttpRequest'
import { HttpResponse, serverError } from '@/presentation/http/HttpResponse'

const makeControllerStub = () => {
  class ControlerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        body: {},
        statusCode: 200,
      }

      return new Promise(resolve => resolve(httpResponse))
    }
  }

  return new ControlerStub()
}

const makeLogErrorRepositoryStub = () => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new LogErrorRepositoryStub()
}

const makeSut = () => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepositoryStub()
  const sut = new ControllerWithLogDecorator(
    controllerStub,
    logErrorRepositoryStub
  )

  return { controllerStub, logErrorRepositoryStub, sut }
}

describe('ControllerWithLogDecorator', () => {
  it('should call passed controller handle method', async () => {
    const { controllerStub, sut } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('should return the same response of the passed controller', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({ body: {}, statusCode: 200 })
  })

  it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { controllerStub, logErrorRepositoryStub, sut } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(serverError(fakeError)))
      )

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }

    await sut.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
