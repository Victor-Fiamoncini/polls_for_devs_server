import { RegexEmailValidator } from 'src/validation/validators'

const makeSut = () => new RegexEmailValidator()

describe('EmailValidator', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut()

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })
})
