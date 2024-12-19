/*
  This script is intended to run via `node`, within a Dockerfile
  build execution.

  It's goal is to create a file containing 'environment variables'
  that will be served by a dedicated nginx endpoint.
*/
const fs = require('fs');

function createJSONFromEnvVars() {
  const envVars = process.env;
  const jsonOutput = {};

  for (const [key, value] of Object.entries(envVars)) {
    jsonOutput[key] = value;
  }

  const filePath = process.argv[1];

  fs.writeFileSync(filePath, JSON.stringify(jsonOutput, null, 2));

  console.log('config file created at:', filePath);
}

createJSONFromEnvVars();