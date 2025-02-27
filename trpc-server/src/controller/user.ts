import { authedProcedure, userProcedure } from '../trpc'
import { z } from 'zod'
import * as bcrypt from 'bcryptjs'
import User from '../dao/User'
import {Op} from 'sequelize'

export const login = authedProcedure
   .input(z.object({
      username: z.string(),
      password: z.string(),
   }))
   .query(async ({input:{username, password}}) => {
      const user = await User.findOne({
         where: {
            username: {
               [Op.eq]: username
            }
         },
      })
      if(!user)
         throw new Error('username or password not correct')
      const r  = bcrypt.compareSync(password, user.password)
      if(r){
         return {
            "state": {
               "userInfo": {
                  "id": "b34719e1-ce46-457e-9575-99505ecee828",
                  "username": "admin",
                  "email": "Parker_Mann@hotmail.com",
                  "avatar": "https://avatars.githubusercontent.com/u/83901939",
                  "createdAt": "2025-08-06T04:39:24.693Z",
                  "updatedAt": "2025-02-22T05:27:41.724Z",
                  "password": "demo1234",
                  "role": {
                     "id": "4281707933534332",
                     "name": "Admin",
                     "label": "admin",
                     "status": 1,
                     "order": 1,
                     "desc": "Super Admin",
                     "permission": [
                        {
                           "id": "9100714781927703",
                           "parentId": "",
                           "label": "sys.menu.dashboard",
                           "name": "menu1",
                           "icon": "ic-analysis",
                           "type": 0,
                           "route": "dashboard",
                           "order": 1,
                           "children": [
                              {
                                 "id": "8426999229400979",
                                 "parentId": "9100714781927703",
                                 "label": "sys.menu.workbench",
                                 "name": "menu2",
                                 "type": 1,
                                 "route": "workbench",
                                 "component": "/dashboard/workbench/index.tsx"
                              }
                           ]
                        }
                     ]
                  },
                  "permissions": [
                     {
                        "id": "9100714781927703",
                        "parentId": "",
                        "label": "sys.menu.dashboard",
                        "name": "menu1",
                        "icon": "ic-analysis",
                        "type": 0,
                        "route": "dashboard",
                        "order": 1,
                        "children": [
                           {
                              "id": "8426999229400979",
                              "parentId": "9100714781927703",
                              "label": "sys.menu.workbench",
                              "name": "menu2",
                              "type": 1,
                              "route": "workbench",
                              "component": "/dashboard/workbench/index.tsx"
                           }
                        ]
                     }
                  ]
               },
               "userToken": {
                  "accessToken": "f5973684-0633-489b-a247-2b069be852c2",
                  "refreshToken": "c6fed9e4-9997-476d-b6db-3e66330109e6"
               }
            },
            "version": 0
         }
      }else{
         throw new Error('username or password not correct')
      }

})
class UserObj{
   id?: number
   username?: string
   password?: string
   age?: number
   realName?: string
}
export const createUser = userProcedure.input(z.instanceof(UserObj)).mutation(async ({input}) => {
   const user = await User.create({username:'tony', age: 19})
   console.log(input)
   return JSON.stringify(user)
})