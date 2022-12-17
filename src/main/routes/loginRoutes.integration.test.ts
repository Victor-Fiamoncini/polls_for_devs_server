import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from 'src/infra'

import { app } from 'src/main/config/app'

describe('loginRoutes', () => {
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

  describe('POST /signup', () => {
    it('should return 201 on signup', async () => {
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

  describe('POST /signin', () => {
    it('should return 200 on signin', async () => {
      await accountCollection.insertOne({
        name: 'Victor',
        email: 'victor@mail.com',
        password: await hash('password12', 12)
      })

      await request(app)
        .post('/api/signin')
        .send({
          email: 'victor@mail.com',
          password: 'password12'
        })
        .expect(200)
    })

    it('should return 401 on signin', async () => {
      await request(app)
        .post('/api/signin')
        .send({
          email: 'victor@mail.com',
          password: 'password12'
        })
        .expect(401)
    })
  })
})
