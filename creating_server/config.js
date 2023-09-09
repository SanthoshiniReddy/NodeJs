var environment = {};

environment.staging = {
    'httpport' : 3000,
    'httpsport' : 30001,
    'envName' : 'Staging'    
};

environment.production = {
    'httpport' : 4000,
    'httpsport' : 4001,
    'envName' : 'Production' 
};

var userEnvName = typeof(process.env.NODE_ENV) == "string" ? process.env.NODE_ENV.toLowerCase() : "";

var environmentName = typeof(environment[userEnvName]) == 'object' ? environment[userEnvName] : environment.staging;

module.exports = environmentName;

