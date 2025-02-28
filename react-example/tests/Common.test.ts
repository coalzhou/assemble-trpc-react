//import trpcClient from '../src/utils/trpc'
import {cn} from '../src/utils/index'

describe('test001', () =>{
    test('test002', () =>{
        console.log('hello')
    })
    /*test('test003', async () =>{
        let useQuery = await trpcClient.getRole.query()
        console.log(useQuery);
        cn("flex h-screen overflow-hidden", themeLayout === ThemeLayout.Horizontal ? "flex-col" : "flex-row")
    })*/
    test('test004', () =>{
        let str = cn("flex h-screen overflow-hidden","flex-col" );
        console.log(str)

    })

})