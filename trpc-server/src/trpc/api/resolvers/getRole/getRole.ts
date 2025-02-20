import { userProcedure } from '../../../trpc'

export const getRole = userProcedure.query(() => {

    console.log('test')
    return {
    role: 'USER' as const }
})
