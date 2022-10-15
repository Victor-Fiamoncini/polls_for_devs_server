
import { SignInController, MissingParamError, InvalidParamError, badRequest } from 'src/presentation'

import { EmailValidator } from 'src/validation'

const makeEmailValidatorStub = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean { return true }
  }

  return new EmailValidatorStub()
}

const makeSut = () => {
  const emailValidator = makeEmailValidatorStub()
  const sut = new SignInController(emailValidator)

  return {
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

    const isValidSpy = jest.spyOn(emailValidator, 'isValid')

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' }
    }

    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should return 400 if an invalid email is provided', async () => {
    const { emailValidator, sut } = makeSut()

    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: { email: 'any_email@mail.com', password: 'any_password' }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
})
