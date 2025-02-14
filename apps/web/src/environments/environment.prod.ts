export const environment = {
  production: true,
  // In production, react app is bundled and served from the express app `apps/server`.
  // This express app also hosts the config endpoint.
  config: `${window.location.origin}/config`,
};
