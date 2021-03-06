import { ControllerWithLogDecorator } from 'src/main/decorators'

import { Controller, HttpRequest, HttpResponse } from 'src/presentation'

const makeControllerStub = () => {
  class ControlerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        body: {},
        statusCode: 200
      }

      return new Promise(resolve => resolve(httpResponse))
    }
  }

  return new ControlerStub()
}

const makeSut = () => {
  const controllerStub = makeControllerStub()
  const sut = new ControllerWithLogDecorator(controllerStub)

  return { controllerStub, sut }
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
        passwordConfirmation: 'any_password'
      }
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
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({ body: {}, statusCode: 200 })
  })
})
