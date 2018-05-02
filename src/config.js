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
    easyArabic: '3202',
    easyHebrew: '3203',
    challengingArabic: '3204',
    challengingHebrew: '3205',
    phaseOne: '3157',
    arabicKeyword: '3201',
    hebrewKeyword: '3156'
  },
  production: {
    panoptesAppId: '68db6a8181e26483a9f82b66b511ca849ef170b10c0e997bdcc277003d779ac6',
    caesarHost: 'https://caesar.zooniverse.org/graphql',
    keywordWorkflow: '5894',
    host: 'https://www.zooniverse.org/',
    projectId: '5042',
    projectSlug: 'judaicadh/scribes-of-the-cairo-geniza',
    easyArabic: '6654',
    easyHebrew: '6652',
    challengingArabic: '6655',
    challengingHebrew: '6653',
    phaseOne: '4712',
    arabicKeyword: '6600',
    hebrewKeyword: '6529'
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
