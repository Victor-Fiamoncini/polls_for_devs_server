import { AuthenticationUseCase } from 'src/domain'

import { SignInController, MissingParamError, InvalidParamError, badRequest, serverError, unauthorized, ok } from 'src/presentation'

import { Validator } from 'src/validation'

const makeAuthenticationUseCaseStub = () => {
  class AuthenticationUseCaseStub implements AuthenticationUseCase.UseCase {
    async auth (params: AuthenticationUseCase.Params): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationUseCaseStub()
}

const makeEmailValidatorStub = () => {
  class EmailValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }

  return new EmailValidatorStub()
}

const makeSut = () => {
  const authenticationUseCaseStub = makeAuthenticationUseCaseStub()
  const emailValidator = makeEmailValidatorStub()
  const sut = new SignInController(emailValidator, authenticationUseCaseStub)

  return {
    authenticationUseCaseStub,
    emailValidator,
    sut
  }
}

describe('SignInController', () => {
  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: { password: 'any_password' }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: { email: 'any_email@mail.com' }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  it('should call EmailValidator with correct email', async () => {
    const { emailValidator, sut } = makeSut()

    const isValidSpy = jest.spyOn(emailValidator, 'validate')

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' }
    }

    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should return 400 if an invalid email is provided', async () => {
    const { emailValidator, sut } = makeSut()

    jest.spyOn(emailValidator, 'validate').mockReturnValueOnce(new InvalidParamError('email'))

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  it('should return 500 if EmailValidator throws', async () => {
    const { emailValidator, sut } = makeSut()

    jest.spyOn(emailValidator, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should call AuthenticationUseCase with correct values', async () => {
    const { authenticationUseCaseStub, sut } = makeSut()

    const authSpy = jest.spyOn(authenticationUseCaseStub, 'auth')

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' }
    }

    await sut.handle(httpRequest)

    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  it('should return 401 if invalid credentials are provided', async () => {
    const { authenticationUseCaseStub, sut } = makeSut()

    jest.spyOn(authenticationUseCaseStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' }
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
      body: { email: 'any_email@mail.com', password: 'any_password' }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' }
    }

    const httpReponse = await sut.handle(httpRequest)

    expect(httpReponse).toEqual(ok({ accessToken: 'any_token' }))
  })
})
