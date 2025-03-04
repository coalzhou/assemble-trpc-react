export default (app ) => {
   app.get('/test',(req, res) =>{
      res.send('Hello World!11')
   })
   app.post('/test2', (req,res) =>{
      res.send('Hello World!22')
   })
}