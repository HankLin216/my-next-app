const withTM = require("next-transpile-modules")(["@lib"]); // pass the modules you would like to see transpiled

module.exports = withTM();
