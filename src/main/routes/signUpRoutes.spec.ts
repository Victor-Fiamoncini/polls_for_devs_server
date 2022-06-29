import request from 'supertest'

import { app } from 'src/main/config/app'

describe('signUpRoutes', () => {
  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Victor',
        email: 'victor@mail.com',
        password: 'password12',
        passwordConfirmation: 'password12'
      })
      .expect(200)
  })
})
