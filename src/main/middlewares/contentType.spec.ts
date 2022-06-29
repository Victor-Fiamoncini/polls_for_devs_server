import request from 'supertest'

import { app } from 'src/main/config/app'

describe('contentType', () => {
  it('should return default response content-type as json', async () => {
    app.get('/test_content_type_json', (req, res) => res.send())

    await request(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/)
  })

  it('should return content-type as xml when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')

      return res.send()
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
