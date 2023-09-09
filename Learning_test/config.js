var environment = {};

environment.staging = {
    'httpPort' : 3001,
    'httpsPort' : 3002,
    'environmentName' : 'Staging'
};

environment.production = {
    'httpPort' : 4001,
    'httpsPort' : 4002,
    'environmentName' : 'Production'
}

var configEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : "";

var environmentName = typeof(environment[configEnv]) !== "undefined" ? environment[configEnv] : environment.staging;

// console.log("environmentName: "+JSON.stringify(environmentName));

module.exports = environmentName;