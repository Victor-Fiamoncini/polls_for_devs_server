import { AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'

import { SignInController } from '@/presentation/controllers/SignInController'
import { MissingParamError } from '@/presentation/errors/MissingParamError'
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/http/HttpResponse'

import { Validator } from '@/validation/contracts/Validator'

const makeAuthenticationUseCaseStub = () => {
  class AuthenticationUseCaseStub implements AuthenticationUseCase.UseCase {
    async auth(credentials: AuthenticationUseCase.Params): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationUseCaseStub()
}

const makeValidatorStub = () => {
  class ValidatorStub implements Validator {
    validate(input: any): Error {
      return null
    }
  }

  return new ValidatorStub()
}

const makeSut = () => {
  const authenticationUseCaseStub = makeAuthenticationUseCaseStub()
  const validatorStub = makeValidatorStub()
  const sut = new SignInController(authenticationUseCaseStub, validatorStub)

  return {
    authenticationUseCaseStub,
    validatorStub,
    sut,
  }
}

describe('SignInController', () => {
  it('should call AuthenticationUseCase with correct values', async () => {
    const { authenticationUseCaseStub, sut } = makeSut()

    const authSpy = jest.spyOn(authenticationUseCaseStub, 'auth')

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' },
    }

    await sut.handle(httpRequest)

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })

  it('should return 401 if invalid credentials are provided', async () => {
    const { authenticationUseCaseStub, sut } = makeSut()

    jest
      .spyOn(authenticationUseCaseStub, 'auth')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' },
    }

    const httpReponse = await sut.handle(httpRequest)

    expect(httpReponse).toEqual(unauthorized())
  })

  it('should return 500 if AuthenticationUseCase throws', async () => {
    const { authenticationUseCaseStub, sut } = makeSut()

    jest.spyOn(authenticationUseCaseStub, 'auth').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' },
    }

    const httpReponse = await sut.handle(httpRequest)

    expect(httpReponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  it('should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()

    const validateSpy = jest.spyOn(validatorStub, 'validate')

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
      },
    }

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()

    jest
      .spyOn(validatorStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_param'))

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_param')))
  })
})
