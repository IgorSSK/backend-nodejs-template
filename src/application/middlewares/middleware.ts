import { HttpResponse } from '@application/helpers/http';

type HttpRequest = any

export interface IMiddleware {
  apply: (request: HttpRequest) => Promise<HttpResponse>
}
