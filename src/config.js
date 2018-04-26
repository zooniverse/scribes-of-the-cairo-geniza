/*
Configuration Settings
----------------------

The config settings change depending on which environment the app is running in.
By default, this is the development environment, but this can be changed either by:

- An ?env query string, e.g. localhost:3000?env=production
- The NODE_ENV environment variable on the system running the app.

 */

const DEFAULT_ENV = 'development';
const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromShell = process.env.NODE_ENV;
const env = envFromBrowser || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|staging|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${env}`);
}

const baseConfig = {
  development: {
    panoptesAppId: 'c71ef0db12dde9e5d8852e7bbc239ef868990d0893cd52c7d47370f90d3992b0',
    caesarHost: 'https://caesar-staging.zooniverse.org/graphql',
    host: 'https://master.pfe-preview.zooniverse.org/',
    keywordWorkflow: '3156',
    projectId: '1814',
    projectSlug: 'wgranger-test/scribes-of-the-cairo-geniza-testing',
    workflowId: '3157'
  },
  production: {
    panoptesAppId: '',
    caesarHost: 'https://caesar.zooniverse.org/graphql',
    host: 'https://www.zooniverse.org/',
    keywordWorkflow: '5894',
    projectId: '5042',
    projectSlug: 'judaicadh/scribes-of-the-cairo-geniza',
    workflowId: ''
  }
};

baseConfig.staging = baseConfig.development;  //staging === development, as far as we're concerned.

const config = baseConfig[env];

export { env, config };

// Try and match the location.search property against a regex. Basically mimics
// the CoffeeScript existential operator, in case we're not in a browser.
function locationMatch(regex) {
  var match;
  if (typeof location !== 'undefined' && location !== null) {
    match = location.search.match(regex);
  }
  return (match && match[1]) ? match[1] : undefined;
}
