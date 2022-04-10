import { IMiddleware } from '@application/middlewares/middleware'

import { NextFunction, Request, RequestHandler, Response } from 'express'

export const adaptExpressMiddleware = (middleware: IMiddleware): RequestHandler =>
  async (request: Request, response: Response, next: NextFunction) => {
    const { data, statusCode } = await middleware.apply({ ...request.headers })

    if (statusCode >= 200 && statusCode <= 299) {
      next()
    } else {
      return response.status(statusCode).json({ error: data })
    }
  }
