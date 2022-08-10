/**
 * Customizes webpack to support graphql files, amongst other things
 *
 * see https://nx.dev/guides/customize-webpack
 */
const { merge } = require('webpack-merge');

const custom = {
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  }
}

module.exports = (config, context) => {
  return merge(config, custom);
}