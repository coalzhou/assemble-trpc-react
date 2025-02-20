import trpcClient from '../src/utils/trpc'


describe('test001', () =>{
    test('test002', () =>{
        console.log('hello')
    })
    test('test003', async () =>{
        let useQuery = await trpcClient.getRole.query()
        console.log(useQuery);
    })
})