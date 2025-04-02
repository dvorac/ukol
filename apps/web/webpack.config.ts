import { TanStackRouterWebpack } from '@tanstack/router-plugin/webpack'

export default {
  plugins: [
    TanStackRouterWebpack({ target: 'react', autoCodeSplitting: true }),
  ],
}