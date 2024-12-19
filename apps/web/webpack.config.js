const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react')
const { EnvironmentPlugin } = require('webpack')

/*
  This will pull system environment variables and push them into
  the `process.env` node object.
*/
const amendedDefinePlugin = new EnvironmentPlugin([
  'API',
  'GQL'
])

module.exports = composePlugins(
  // default Nx composable plugin
  withNx(),
  // default react composable plugin
  withReact(),
  // Custom composable plugin
  // (config, { options, context }) => {

  //   config.plugins.push(amendedDefinePlugin);

  //   return config;
  // }
);