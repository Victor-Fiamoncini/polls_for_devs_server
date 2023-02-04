import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra/hash/BcryptAdapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hashed_value'
  },
  async compare(): Promise<boolean> {
    return true
  },
}))

const salt = 12
const makeSut = () => new BcryptAdapter(salt)

describe('BcryptAdapter', () => {
  it('should call hash with correct values', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a valid hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.hash('any_value')

    expect(hash).toBe('hashed_value')
  })

  it('should throw if hash throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })

  it('should call compare with correct values', async () => {
    const sut = makeSut()

    const compareSpy = jest.spyOn(bcrypt, 'compare')

    await sut.compare({
      plainPayload: 'any_plain_payload',
      hashedPayload: 'any_hashed_payload',
    })

    expect(compareSpy).toHaveBeenCalledWith(
      'any_plain_payload',
      'any_hashed_payload'
    )
  })

  it('should return true if compare succeeds', async () => {
    const sut = makeSut()

    const isValid = await sut.compare({
      plainPayload: 'any_plain_payload',
      hashedPayload: 'any_hashed_payload',
    })

    expect(isValid).toBe(true)
  })

  it('should return false if compare fails', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)

    const isValid = await sut.compare({
      plainPayload: 'any_plain_payload',
      hashedPayload: 'any_hashed_payload',
    })

    expect(isValid).toBe(false)
  })

  it('should throw if compare throws', async () => {
    const sut = makeSut()

    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error()))
      )

    const comparePromise = sut.compare({
      plainPayload: 'any_plain_payload',
      hashedPayload: 'any_hashed_payload',
    })

    await expect(comparePromise).rejects.toThrow()
  })
})
