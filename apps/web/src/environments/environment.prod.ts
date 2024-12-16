/*
  Do not use these variables in code outside of this file.
  These are placeholders for webpack to replace at build-time
  with values from built-time environment variables, which will
  be baked-in to the frontend build.
*/
declare var _GQL_: string;
declare var _API_: string;

export const environment = {
  production: true,
  graphql: _GQL_,
  api: _API_,
};
