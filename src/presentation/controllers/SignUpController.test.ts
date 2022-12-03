import { AccountEntity, AddAccountUseCase } from 'src/domain'

import { SignUpController, InvalidParamError, MissingParamError, ServerError, badRequest } from 'src/presentation'

import { EmailValidator, Validator } from 'src/validation'

const makeAddAccountUseCaseStub = () => {
  class AddAccountUseCaseStub implements AddAccountUseCase.UseCase {
    async add (account: AddAccountUseCase.Params): Promise<AccountEntity> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }

      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountUseCaseStub()
}

const makeEmailValidatorStub = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean { return true }
  }

  return new EmailValidatorStub()
}

const makeValidatorStub = () => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidatorStub()
}

const makeSut = () => {
  const emailValidatorStub = makeEmailValidatorStub()
  const addAccountUseCaseStub = makeAddAccountUseCaseStub()
  const validatorStub = makeValidatorStub()
  const sut = new SignUpController(emailValidatorStub, addAccountUseCaseStub, validatorStub)

  return {
    addAccountUseCaseStub,
    emailValidatorStub,
    validatorStub,
    sut
  }
}

describe('SignUpController', () => {
  it('should return 400 if an invalid email is provided', async () => {
    const { emailValidatorStub, sut } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  it('should call EmailValidator with correct email', async () => {
    const { emailValidatorStub, sut } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  it('should return 500 if EmailValidator throws', async () => {
    const { emailValidatorStub, sut } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('should call AddAccountUseCase with correct values', async () => {
    const { addAccountUseCaseStub, sut } = makeSut()

    const addSpy = jest.spyOn(addAccountUseCaseStub, 'add')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  it('should return 500 if AddAccountUseCase throws', async () => {
    const { addAccountUseCaseStub, sut } = makeSut()

    jest.spyOn(addAccountUseCaseStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('should return 209 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
  })

  it('should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()

    const validateSpy = jest.spyOn(validatorStub, 'validate')

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()

    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_param')))
  })
})
