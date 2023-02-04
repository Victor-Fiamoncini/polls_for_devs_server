import { HttpRequest } from '@/presentation/http/HttpRequest'
import { HttpResponse } from '@/presentation/http/HttpResponse'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
