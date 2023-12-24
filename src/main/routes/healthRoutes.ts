import { Router } from 'express'

export default (router: Router): void => {
  router.get('/health', (request, response) => {
    return response.status(200).send('Server is alive')
  })
}
