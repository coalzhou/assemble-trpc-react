import { createTRPCProxyClient, httpLink } from '@trpc/client'
import { cleanEnv } from 'envalid'

const { isProd } = cleanEnv(process.env, {})

const HttpService = {
host: 'localhost', // NOTE: must be a raw hostname
serverPort: 9540,
clientPort: 9541,
serverUrl: isProd ? `https://localhost` : `http://localhost:9540`,
clientUrl: isProd ? `https://localhost` : `http://localhost:9541`
}
import { type AppRouter } from './api/router'


// @ts-ignore
export const client = createTRPCProxyClient<AppRouter>({links: [httpLink({ url: `${HttpService.serverUrl}/trpc` })] })
