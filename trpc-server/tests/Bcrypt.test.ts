import * as bcrypt from 'bcryptjs'

async function generateSalt() {
   return await bcrypt.genSalt(5871423);
}

describe('test001', () => {
   test('test002', async () => {
      let salt = bcrypt.genSaltSync(5)
     const r = bcrypt.hashSync('123456', salt)
      console.log(r) // $2b$05$9hpjp.wRSw4ncNWyByd2Au3c4A8lIsrOF2HVjnfXaR0cPr10ghGvS
   })
   test('test003', async () => {
      let salt = bcrypt.genSaltSync(5)
      const r  = bcrypt.compareSync('123456', '$2b$05$9hpjp.wRSw4ncNWyByd2Au3c4A8lIsrOF2HVjnfXaR0cPr10ghGvS')

      console.log(r) //true
   })

})