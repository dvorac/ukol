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

retargeted webpack config in `apps/web/project.json` to new `webpack.config.ts`, then ran
```bash
yarn nx run web:build:development
```
error:
> ERROR in main
    Module not found: Error: Can't resolve './src' in '/Users/dvorac/projects/ukol'
    resolve './src' in '/Users/dvorac/projects/ukol'
    using description file: /Users/dvorac/projects/ukol/package.json (relative path: .)
        Field 'browser' doesn't contain a valid alias configuration
        using description file: /Users/dvorac/projects/ukol/package.json (relative path: ./src)
        no extension
            Field 'browser' doesn't contain a valid alias configuration
            /Users/dvorac/projects/ukol/src doesn't exist
        .js
            Field 'browser' doesn't contain a valid alias configuration
            /Users/dvorac/projects/ukol/src.js doesn't exist
        .json
            Field 'browser' doesn't contain a valid alias configuration
            /Users/dvorac/projects/ukol/src.json doesn't exist
        .wasm
            Field 'browser' doesn't contain a valid alias configuration
            /Users/dvorac/projects/ukol/src.wasm doesn't exist
        as directory
            /Users/dvorac/projects/ukol/src doesn't exist

guessing this is more because the nx/react plugin is no longer in the config, since we no longer use the default.

after a little playing around, found a good start point:
- made webpack config a js file, not ts `webpack.config.js`,
- rewrote syntax to be js module, i.e. use `require` not `import`, `module.exports = ...` not `export default ...`
- still using "Nx-enhanced" webpack config, with the `@nx/webpack:webpack` executor for build.
- the `TanStackRouterWebpack` plugin now needs to go in the "custom" plugin bucket inside the NX `composePlugins` tool.

this allows the build with the following warning:
> nx run web:build:development

Browserslist: browsers data (caniuse-lite) is 7 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme

♻️  Generating routes...
Error: ENOENT: no such file or directory, scandir '/Users/dvorac/projects/ukol/src/routes'
    at async Module.readdir (node:internal/fs/promises:953:18)
    at async recurse (/Users/dvorac/projects/ukol/node_modules/@tanstack/router-generator/dist/cjs/filesystem/physical/getRouteNodes.cjs:34:19)
    at async Module.getRouteNodes (/Users/dvorac/projects/ukol/node_modules/@tanstack/router-generator/dist/cjs/filesystem/physical/getRouteNodes.cjs:146:3)
    at async Module.generator (/Users/dvorac/projects/ukol/node_modules/@tanstack/router-generator/dist/cjs/generator.cjs:66:27)
    at async generate (/Users/dvorac/projects/ukol/node_modules/@tanstack/router-plugin/dist/cjs/core/router-generator-plugin.cjs:46:7)
    at async run (/Users/dvorac/projects/ukol/node_modules/@tanstack/router-plugin/dist/cjs/core/router-generator-plugin.cjs:70:7)
    at async /Users/dvorac/projects/ukol/node_modules/@tanstack/router-plugin/dist/cjs/core/router-generator-plugin.cjs:112:11 {
  errno: -2,
  code: 'ENOENT',
  syscall: 'scandir',
  path: '/Users/dvorac/projects/ukol/src/routes'
}

✅ unplugin:router-generator: route-tree generation done
✅ unplugin:router-code-splitter: code-splitting done!
Entrypoint main [big] 1.13 MiB (1.68 MiB) = runtime.js 6.42 KiB vendor.js 1.11 MiB main.js 21.1 KiB 3 auxiliary assets
Entrypoint polyfills [big] 505 KiB (596 KiB) = runtime.js 6.42 KiB polyfills.js 499 KiB 2 auxiliary assets
chunk (runtime: runtime) runtime.js (runtime) 3.26 KiB [entry] [rendered]
chunk (runtime: runtime) polyfills.js (polyfills) 452 KiB [initial] [rendered]
chunk (runtime: runtime) vendor.js (vendor) (id hint: vendor) 1.06 MiB [initial] [rendered] split chunk (cache group: vendor) (name: vendor)
chunk (runtime: runtime) main.js (main) 19.7 KiB [initial] [rendered]
webpack compiled successfully (f25421b882b5e4ad)
