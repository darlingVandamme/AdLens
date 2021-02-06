const configFile = require('./settings/settings.json');
const privateFile = require('./settings/private.json');

const defaultConfig = configFile.development;
const environment = process.env.NODE_ENV || 'development';

const environmentConfig = configFile[environment];
const environmentPrivate = privateFile[environment];

let config = Object.assign(defaultConfig, environmentConfig);
config = Object.assign(config, environmentPrivate);


module.exports = config;
