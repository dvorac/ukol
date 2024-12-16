const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react')
const { DefinePlugin } = require('webpack')

/*
  This is used to pull `process.env` variables into the
*/
const amendedDefinePlugin = new DefinePlugin({
  _GQL_: JSON.stringify(process.env['GQL']),
  _API_: JSON.stringify(process.env['API']),
})

module.exports = composePlugins(
  // default Nx composable plugin
  withNx(),
  // default react composable plugin
  withReact(),
  // Custom composable plugin
  (config, { options, context }) => {

    config.plugins.push(amendedDefinePlugin);

    return config;
  }
);