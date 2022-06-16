export interface HttpResponse {
  statusCode: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500
  body: any
}

export const badRequest = (error: Error): HttpResponse => ({ statusCode: 400, body: error })
