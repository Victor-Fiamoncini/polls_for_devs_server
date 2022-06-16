import { HttpRequest, HttpResponse } from 'src/presentation'

export interface Controller {
  handle(httpRequest: HttpRequest): HttpResponse
}
