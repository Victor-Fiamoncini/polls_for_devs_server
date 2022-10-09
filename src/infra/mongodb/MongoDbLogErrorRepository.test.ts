import { Collection } from 'mongodb'

import { MongoDbLogErrorRepository, MongoHelper } from 'src/infra'

const makeSut = () => new MongoDbLogErrorRepository()

describe('MongoDbLogErrorRepository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')

    await errorCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should create an error log on success', async () => {
    const sut = makeSut()

    await sut.logError('any_stack')
    const errorsCount = await errorCollection.countDocuments()

    expect(errorsCount).toBe(1)
  })
})
