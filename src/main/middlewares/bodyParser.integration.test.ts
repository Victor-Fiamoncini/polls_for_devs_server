import request from 'supertest'

import { app } from '@/main/config/app'

describe('bodyParser', () => {
  it('should parse http request body to json', async () => {
    app.post('/test_body_parser', (req, res) => res.send(req.body))

    await request(app).post('/test_body_parser').send({ value: 'any_value' }).expect({ value: 'any_value' })
  })
})
