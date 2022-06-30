import request from 'supertest'

import { MongoHelper } from 'src/infra'

import { app } from 'src/main/config/app'

describe('signUpRoutes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('accounts').deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

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
