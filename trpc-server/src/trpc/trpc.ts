import { initTRPC } from '@trpc/server'

import { type Context } from '../trpcRouter/router'


const t = initTRPC.context<Context>().create(
)

export const userProcedure = t.procedure

export const authedProcedure  = userProcedure.use(async ({ ctx, next }) => {
   //let authToken =ctx.req?.headers?.authorizatio
const authorization = ctx.req.headers.authorization?.split(' ')[1]

    return next({
        ctx: {
            ...ctx,
            user: {
                id: '1',
                name: 'John Doe',
                role: 'USER',
            },
        },
    })
})

export const { middleware, router } = t
