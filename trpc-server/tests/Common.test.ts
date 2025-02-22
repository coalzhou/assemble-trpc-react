import { cleanEnv, port, str as string } from 'envalid'
import {Sequelize} from "sequelize"
// 创建数据库连接
const sequelize = new Sequelize('forceset', 'root', 'qazwsxedc321', {
   host: '110.42.205.101',
   dialect: 'mysql',
   logging: true, // 生成的sql语句不在控制台打印
})
// 测试连接
async function MyFn() {
   try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      return 'successfully'
   } catch (error) {
      console.error('Unable to connect to the database:', error);
      return 'error'
   }
}
import Redis from 'ioredis'


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
      debugger
      console.log(r)
   })
   test('test004', async () => {
      const r = await MyFn()
      debugger
      console.log('finish')
   })
   test('test005', async () => {
      const redis = new Redis(6379, '110.42.205.101', {
         password: 'messiisgreat1109',
         db: 0
      });
      await redis.set('aaa','bbbb','EX', 300)
      console.log('finish')
   })
})
