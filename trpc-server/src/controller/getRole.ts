import { userProcedure } from '../trpc'

export const getRole = userProcedure.query(() => {


    return {
    role: 'USER' as const }
})
