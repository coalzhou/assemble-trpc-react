
import {createTRPCProxyClient, httpBatchLink, TRPCClient, TRPCLink} from '@trpc/client';
import {type AppRouter} from '../../../trpc-server/src/trpcRouter/router.js'
//import { createTRPCContext } from '@trpc/tanstack-react-query';
import userStore from "@/store/userStore";
import {observable} from "@trpc/server/observable";

//export const queryClient = getQueryClient();

function responseInterceptorLink(): TRPCLink<AppRouter> {
    return () =>{
        return ({ next, op }) => {
            return observable((observer) => {
                const unsubscribe = next(op).subscribe({
                    next(value) {
                        console.log('we received value', value);
                        observer.next(value);
                    },
                    error(err) {
                        console.log('we received error', err);
                        console.log(err.message); // UNAUTHORIZED
                        debugger
                        observer.error(err);
                    },
                    complete() {
                        observer.complete();
                    },
                });
                return unsubscribe;

            })
        }
    }

}

let trpcClient: TRPCClient<AppRouter> = createTRPCProxyClient<AppRouter>({
    links: [
        responseInterceptorLink(),
        httpBatchLink({
            url: '/backend-api/trpc',
            async headers(){
                return {
                    authorization: 'bearer '+userStore.getState().userToken.accessToken
                }
            },
        }),

    ],


});

export default trpcClient

//export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

