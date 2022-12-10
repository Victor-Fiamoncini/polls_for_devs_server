import jwt from 'jsonwebtoken'

import { JwtAdapter } from 'src/infra'

jest.mock('jsonwebtoken', () => ({
  sign: async () => {
    return 'any_token'
  }
}))

const makeSut = () => new JwtAdapter('any_secret')

describe('JwtAdapter', () => {
  it('should call sign with correct params', async () => {
    const sut = makeSut()

    const signSpy = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any_payload')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_payload' }, 'any_secret')
  })

  it('should return a token on sign success', async () => {
    const sut = makeSut()

    const accessToken = await sut.encrypt('any_payload')

    expect(accessToken).toBe('any_token')
  })

  it('should throw if sign throws', async () => {
    const sut = makeSut()

    jest
      .spyOn(jwt, 'sign')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error()))
      )

    const encryptPromise = sut.encrypt('any_payload')

    await expect(encryptPromise).rejects.toThrow()
  })
})
