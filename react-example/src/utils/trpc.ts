
import {createTRPCProxyClient, httpBatchLink, TRPCClient} from '@trpc/client';

import {type AppRouter} from '../../../trpc-server/src/trpcRouter/router.js'


//import { createTRPCContext } from '@trpc/tanstack-react-query';
import { QueryClient } from "@tanstack/react-query";
import userStore from "@/store/userStore";


function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
export const queryClient = getQueryClient();

let trpcClient: TRPCClient<AppRouter> = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: '/backend-api/trpc',
            async headers(){
                return {
                    authorization: 'bearer '+userStore.getState().userToken.accessToken
                }
            }
        }),
    ],
});
export default trpcClient

//export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

