//==============================================================================
// ■ Global (gloabal.js)
//------------------------------------------------------------------------------
//     Globally available objects.
//==============================================================================

//------------------------------------------------------------------------------
// ● Time
//------------------------------------------------------------------------------
global.minutesToMs = (minutes) => minutes * 6e+4;
global.hoursToMs = (hours) => hours * 3.6e+6;
global.daysToMs = (days) => days * 8.64e+7;


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
