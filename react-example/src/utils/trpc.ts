
import { createTRPCProxyClient,httpLink } from '@trpc/client';
import {type AppRouter} from '../../../trpc-server/src/trpc/api/router.js'

const trpcClient = createTRPCProxyClient<AppRouter>({
    links: [
        httpLink({
            url: 'http://localhost:9540/trpc',
        }),
    ]
})

export default trpcClient