import cookieParser from 'cookie-parser'
import express from 'express'
//import { join, resolve } from 'path'

import { type RequestHandler } from 'express-serve-static-core'

import { initializeTrpc } from '../trpcRouter/router'

export class Middlewares {
   public static config(app: express.Application) {
      app.use(cookieParser() as RequestHandler)

      initializeTrpc(app)

      /*if (isProd) {
         this.serveWeb(app)
      }*/
   }

   /*private static serveWeb(app: express.Application) {
      const buildPath = resolve(__dirname, '../../../../react-example/dist')

      app.use(express.static(buildPath) as unknown as RequestHandler)

      app.get('*', (_, res) => res.sendFile(join(buildPath, 'index.html')))
   }*/
}
