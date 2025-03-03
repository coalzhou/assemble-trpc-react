//import type { inferAsyncReturnType } from '@trpc/server'
//import type { CreateExpressContextOptions, CreateNextContextOptions } from '@trpc/server/adapters/express'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import type { Application } from 'express'

import { router } from '../trpc'
import cors from 'cors'
import * as role from '../controller/getRole'
import * as user from '../controller/user'

const appRouter = router({ role, user })
export type AppRouter = typeof appRouter

export type Context = Awaited<ReturnType<typeof createContext>>



const createContext = ({ req, res }: CreateNextContextOptions) => ({
   req,
   res,
})

export const initializeTrpc = async (app: Application) => {
   app.use(
      '/trpc',
      createExpressMiddleware({
         router: appRouter,
         createContext,
         middleware: cors()
      })
   )


}
