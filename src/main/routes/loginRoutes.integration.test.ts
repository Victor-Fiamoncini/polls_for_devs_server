import request from 'supertest'

import { MongoHelper } from 'src/infra'

import { app } from 'src/main/config/app'

describe('loginRoutes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')

    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    it('should return an account on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Victor',
          email: 'victor@mail.com',
          password: 'password12',
          passwordConfirmation: 'password12'
        })
        .expect(201)
    })
  })
})
