import { MongoHelper as sut } from 'src/infra'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')

    expect(accountCollection).toBeTruthy()

    await sut.disconnect()

    accountCollection = await sut.getCollection('accounts')

    expect(accountCollection).toBeTruthy()
  })
})
