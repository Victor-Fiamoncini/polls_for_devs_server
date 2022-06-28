import bcrypt from 'bcrypt'

import { BcryptEncrypter } from 'src/infra/encrypter'

const salt = 12
const makeSut = () => new BcryptEncrypter(salt)

describe('BcryptEncrypter', () => {
  it('should call bcrypt with correct values', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
