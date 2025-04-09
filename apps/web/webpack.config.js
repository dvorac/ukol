const { TanStackRouterWebpack } = require('@tanstack/router-plugin/webpack');
const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

module.exports = composePlugins(
  withNx(),
  withReact(),
  (config, { options, context }) => {
    config.plugins?.push(TanStackRouterWebpack({
      target: `react`,
      autoCodeSplitting: true,
      routesDirectory: './apps/web/src/routes',
      generatedRouteTree: './apps/web/src/routeTree.gen.ts'
    }))
    return config;
  }
)