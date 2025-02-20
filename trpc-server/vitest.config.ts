import { type UserConfig, defineConfig, mergeConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig(({ mode }) => {

   return {
      test: {
         setupFiles: ['vitest.setup.ts'],
         coverage: {
            provider: 'istanbul',
            reporter: ['html', 'text-summary', 'lcovonly'],
            all: true,
         },
         testTimeout: 15000,
      },
      plugins: [tsconfigPaths()],
   }
})
