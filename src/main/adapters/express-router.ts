
import { IController } from '@application/controller/controller'

import { NextFunction, Request, RequestHandler, Response } from 'express'

export const adaptExpressMiddleware = (controller: IController): RequestHandler =>
  async (request: Request, response: Response, next: NextFunction) => {
    const entries = {
      ...request.body,
      ...request.params,
      ...request.query
    }

    const { data, statusCode } = await controller.handle(entries)

    const json = (statusCode >= 200 && statusCode <= 299) ? data : { error: data }

    return response.status(statusCode).json(json)
  }
