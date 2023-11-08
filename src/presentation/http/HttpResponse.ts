import { ServerError } from '@/presentation/errors/ServerError'
import { UnauthorizedError } from '@/presentation/errors/UnauthorizedError'

export interface HttpResponse {
  statusCode: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500
  body: any
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
})

export const ok = (data: any): HttpResponse => ({ statusCode: 200, body: data })

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
})
