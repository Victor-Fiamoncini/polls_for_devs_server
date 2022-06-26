import { EmailValidatorAdapter } from 'src/validation/validators'

jest.mock('src/validation/validators/EmailValidatorAdapter')

EmailValidatorAdapter.prototype.isValid = jest.fn(() => true)

const makeSut = () => new EmailValidatorAdapter()

describe('EmailValidatorAdapter', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut()

    jest.spyOn(sut, 'isValid').mockImplementationOnce(() => false)

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })

  it('should return true if validator returns true', () => {
    const sut = makeSut()

    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const sut = makeSut()

    const testSpy = jest.spyOn(sut, 'isValid')

    sut.isValid('any_email@mail.com')

    expect(testSpy).toHaveBeenNthCalledWith(1, 'any_email@mail.com')
  })
})
