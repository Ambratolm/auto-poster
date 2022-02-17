//==============================================================================
// ■ Global (gloabal.js)
//------------------------------------------------------------------------------
//     Globally available objects.
//==============================================================================

//------------------------------------------------------------------------------
// ● Time
//------------------------------------------------------------------------------
global.seconds = (seconds) => seconds * 1e3;
global.minutes = (minutes) => minutes * 6e4;
global.hours = (hours) => hours * 3.6e6;
global.days = (days) => days * 8.64e7;

//------------------------------------------------------------------------------
// ● Random
//------------------------------------------------------------------------------
global.random = function (min = 0, max = 5000) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//------------------------------------------------------------------------------
// ● Environment
//------------------------------------------------------------------------------
const envVars = require("dotenv").config().parsed;
const { NODE_ENV } = process.env;
global.env = {
  vars: envVars,
  isDev:
    NODE_ENV === "development" ||
    NODE_ENV === "dev" ||
    (NODE_ENV !== "production" && NODE_ENV !== "prod"),
  log() {
    console.log("Environment:");
    console.log(
      `\t• Mode: ${this.isDev ? "Development".yellow : "Production".green}`
    );
    console.log("\t• Variables:");
    for (const key in this.vars) {
      console.log(`\t\t→ ${key}: ${this.vars[key].cyan}`);
    }
  },
};
