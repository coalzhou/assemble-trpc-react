import { userProcedure,authedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const getRole = authedProcedure.query((ctx) => {

    //throw new TRPCError({code:'UNAUTHORIZED'})
    return { role: 'USER' as const }
})
export const getRole1 = userProcedure.query(() => {


    return {
        menu: 'role'}
})