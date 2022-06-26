import { HttpRequest, HttpResponse } from 'src/presentation/http'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
