import  express from 'express'
import http from 'http'

import { PORT } from '../env'
import test from '../http/test'

export class HttpServer {
   public static create() {
      const app = express()

      const server = http.createServer(app)

      server.listen(PORT, () => console.log(`🚀 Server has launched on port ${PORT}`))

      test(app)

      return { app }
   }
}
