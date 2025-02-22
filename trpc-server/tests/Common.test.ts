import { cleanEnv, port, str as string } from 'envalid'

describe('test001', () => {
   test('test002', async () => {
      console.log('hello')
   })
   test('test003', ()=>{
      let r = cleanEnv(process.env, {
         PORT: port({
            desc: 'Port the Express server is running on',
            example: '9540',
            default: 9540,
            docs: 'https://expressjs.com/en/starter/hello-world.html',
         }),
         NODE_ENV: string({
            desc: 'The mode the Express is running in',
            example: 'development',
            choices: ['development','test', 'production'] as const,
            default: 'development',
            docs: 'https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/',
         }),
      })
      const a = string({
         desc: 'The mode the Express is running in',
         example: 'development',
         choices: ['development','test', 'production'] as const,
         default: 'development',
         docs: 'https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/',
      })
   })
})
