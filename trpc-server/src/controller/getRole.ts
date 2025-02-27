import { userProcedure,authedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import User from '../dao/User'


export const getRole = authedProcedure.query((ctx) => {

    //throw new TRPCError({code:'UNAUTHORIZED'})
    return { role: 'USER' as const }
})
export const getRole1 = userProcedure.query(() => {

    return {
        menu: 'role'}
})
export const syncUser = userProcedure.mutation(() => {
    User.sync({ force: true })
    return 'success'
})
export const createUser = userProcedure.mutation(async () => {
    const user = await User.create({username:'tony', age: 19})
    return JSON.stringify(user)
})
export const getUser = userProcedure.query(async () => {
    let user = await User.findByPk(1)
    user.set({
        username: 'jack'
    })
    await user.save()
    await user.reload()
    return JSON.stringify(user)
})
export const deleteUser = userProcedure.mutation(async () => {
    let user = await User.findByPk(1)

    await user.destroy()

})


