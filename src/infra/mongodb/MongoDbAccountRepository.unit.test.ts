import { Collection } from 'mongodb'

import { MongoDbAccountRepository } from '@/infra/mongodb/MongoDbAccountRepository'
import { MongoHelper } from '@/infra/mongodb/MongoHelper'

const makeSut = () => new MongoDbAccountRepository()

describe('MongoDbAccountRepository', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')

    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an account on add success', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  it('should return an account on loadByEmail success', async () => {
    const sut = makeSut()

    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    const account = await sut.loadByEmail({ email: 'any_email@mail.com' })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  it('should return null if loadByEmail fails', async () => {
    const sut = makeSut()

    const account = await sut.loadByEmail({ email: 'any_email@mail.com' })

    expect(account).toBeFalsy()
  })

  it('should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()

    const result = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    await sut.updateAccessToken({
      id: result.insertedId.toString(),
      token: 'any_token',
    })

    const account = await accountCollection.findOne({ _id: result.insertedId })

    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
