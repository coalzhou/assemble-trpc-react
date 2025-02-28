import { cleanEnv, port, str as string } from 'envalid'
import {v4} from 'uuid'


const pino = require('pino')
const rfs = require('rotating-file-stream')
const { tmpdir } = require('node:os')
const { join } = require('node:path')
const pretty = require('pino-pretty')
const multistream = require('pino-multi-stream').multistream
import moment from 'moment'

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
   test('test004', ()=>{
      console.log(v4()) // 6e4bfa0e-bc70-42d2-b060-44775334ad93
   })
   test('test005', ()=>{
      //console.log(tmpdir())
      const pad = num => (num > 9?"":"0") + num
      const generator = (time, index) =>{
         if(!time) return "trpc-logger.log"
         let month = time.getFullYear() + pad(time.getMonth() + 1)
         let day = pad(time.getDate())
        return `${month}-${day}-trpc-logger.log`
      }
      const stream = rfs.createStream(generator,{
         size: '10M',
         interval: "1d",
         path: "./logs"
      })
      // process.stdout   pretty({ colorize: true,translateTime: true })
      const streams = [{stream, level: 'info'},{stream: process.stdout,level: 'info'}]

      const logger = pino({
            level:"info",
            timestamp: ()=>moment().format('YYYY-MM-DD HH:mm:ss'),
         },
         multistream(streams))

      logger.info({ obj: 42, b: 2 }, 'hello world')
      logger.error('the answer is %d', 42)

      console.log('original')
   })
})


