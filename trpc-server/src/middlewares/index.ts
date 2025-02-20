import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { join, resolve } from 'path'

import { type RequestHandler } from 'express-serve-static-core'

import { isProd } from '../env'

import { initializeTrpc } from '../trpc/api/router'

export class Middlewares {
   public static config(app: express.Application) {
      app.use(cookieParser() as RequestHandler)

      initializeTrpc(app)

      if (isProd) {
         this.serveWeb(app)
      }
   }

   private static serveWeb(app: express.Application) {
      const buildPath = resolve(__dirname, '../../../../react-example/dist')

      app.use(express.static(buildPath) as unknown as RequestHandler)

      app.get('*', (_, res) => res.sendFile(join(buildPath, 'index.html')))
   }
}
