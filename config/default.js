const bbVanilla = require('./modules/bookBuilderVanilla')
const bbOEN = require('./modules/bookBuilderOEN')
const bbBooksprints = require('./modules/bookBuilderBooksprints')
const vanilla = require('./modules/vanillaTeams')
const booksprints = require('./modules/booksprintsTeams')

const flavour =
  process.env.KETIDA_FLAVOUR && process.env.KETIDA_FLAVOUR === 'BOOKSPRINTS'
    ? 'BOOKSPRINTS'
    : 'VANILLA'

const featureBookStructureEnabled =
  (process.env.FEATURE_BOOK_STRUCTURE &&
    JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
  false

let bookBuilder

if (!featureBookStructureEnabled) {
  if (flavour === 'BOOKSPRINTS') {
    bookBuilder = bbBooksprints
  } else {
    bookBuilder = bbVanilla
  }
} else {
  bookBuilder = bbOEN
}

module.exports = {
  bookBuilder,
  authorization: {
    teams: flavour === 'BOOKSPRINTS' ? booksprints.teams : vanilla.teams,
  },
  publicKeys: ['bookBuilder', 'pubsweet-client', 'authorization'],
  'pubsweet-client': {
    API_ENDPOINT: '/api',
    'login-redirect': '/',
    navigation: 'app/components/Navigation/Navigation.jsx',
    routes: 'app/routes.jsx',
    theme: 'ThemeEditoria',
    port: 3000,
    protocol: 'http',
    host: 'localhost',
  },
  'pubsweet-server': {
    db: {},
    useGraphQLServer: true,
    useJobQueue: false,
    serveClient: false,
    graphiql: true,
    tokenExpiresIn: '360 days',
    port: 3000,
    protocol: 'http',
    host: 'localhost',
    uploads: 'uploads',
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
  },
  schema: {},
  featureBookStructure: false,
  featureUploadDOCXFiles: true,
}
