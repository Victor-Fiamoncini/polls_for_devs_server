import { AccountEntity } from '@/domain/entities/AccountEntity'
import { AddAccountUseCase } from '@/domain/usecases/AddAccountUseCase'
import { AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'

import { SignUpController } from '@/presentation/controllers/auth/SignUpController'
import { MissingParamError } from '@/presentation/errors/MissingParamError'
import { ServerError } from '@/presentation/errors/ServerError'
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from '@/presentation/http/HttpResponse'

import { Validator } from '@/validation/contracts/Validator'

import { EmailAlreadyUsedError } from '../../errors/EmailAlreadyUsedError'

const makeAddAccountUseCaseStub = () => {
  class AddAccountUseCaseStub implements AddAccountUseCase.UseCase {
    async add(account: AddAccountUseCase.Params): Promise<AccountEntity> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
      }

      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountUseCaseStub()
}

const makeValidatorStub = () => {
  class ValidatorStub implements Validator {
    validate(input: any): Error {
      return null
    }
  }

  return new ValidatorStub()
}

const makeAuthenticationUseCaseStub = () => {
  class AuthenticationUseCaseStub implements AuthenticationUseCase.UseCase {
    async auth(credentials: AuthenticationUseCase.Params): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationUseCaseStub()
}

const makeSut = () => {
  const addAccountUseCaseStub = makeAddAccountUseCaseStub()
  const validatorStub = makeValidatorStub()
  const authenticationUseCaseStub = makeAuthenticationUseCaseStub()
  const sut = new SignUpController(
    addAccountUseCaseStub,
    validatorStub,
    authenticationUseCaseStub
  )

  return {
    addAccountUseCaseStub,
    validatorStub,
    authenticationUseCaseStub,
    sut,
  }
}

describe('SignUpController', () => {
  it('should call AddAccountUseCase with correct values', async () => {
    const { addAccountUseCaseStub, sut } = makeSut()

    const addSpy = jest.spyOn(addAccountUseCaseStub, 'add')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })

  it('should return 500 if AddAccountUseCase throws', async () => {
    const { addAccountUseCaseStub, sut } = makeSut()

    jest
      .spyOn(addAccountUseCaseStub, 'add')
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()))
      })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
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

  it('should return 403 AddAccountUseCase returns null', async () => {
    const { sut, addAccountUseCaseStub } = makeSut()

    jest.spyOn(addAccountUseCaseStub, 'add').mockReturnValueOnce(null)

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' },
    }

    const httpReponse = await sut.handle(httpRequest)

    expect(httpReponse).toEqual(
      forbidden(new EmailAlreadyUsedError('any_email@mail.com'))
    )
  })
})
