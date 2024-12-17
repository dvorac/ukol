/*
  We are actually only interested in disabling the noPropertyAccessFromIndexSignature ts rule here.
  However, you cannot disable a single rule for a whole file in Typescript.
*/
// @ts-nocheck

export const environment = {
  production: true,
  graphql: process.env.GQL,
  api: process.env.API,
};
