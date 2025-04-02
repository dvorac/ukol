yarn add -D @tanstack/router-plugin 

yarn nx run-many --target=build --configuration=development

https://tanstack.com/router/latest/docs/framework/react/routing/installation-with-webpack
gives directions to add to plugin configuration:
```typescript
// webpack.config.ts
import { TanStackRouterWebpack } from '@tanstack/router-plugin/webpack'

export default {
  plugins: [
    TanStackRouterWebpack({ target: 'react', autoCodeSplitting: true }),
  ],
}
```

currently, we use the nx default `@nx/react/plugins/webpack` config per `apps/web/project.json`

add new `webpack.config.ts` to web project, copy above into it.

file sees error as:
> Cannot find module '@tanstack/router-plugin/webpack' or its corresponding type declarations.
  There are types at '/Users/dvorac/projects/ukol/node_modules/@tanstack/router-plugin/dist/esm/webpack.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.ts(2307)

type files exist in `node_modules/@tanstack/router-plugin/dist/[esm|cjs]/webpack.d.ts`, and the accompanying package.json seems to direct to those files for `require`/`import` statements.

