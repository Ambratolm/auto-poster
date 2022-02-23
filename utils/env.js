//==============================================================================
// ■ Environment (env.js)
//------------------------------------------------------------------------------
//     Runtime environment utilities.
//==============================================================================

//------------------------------------------------------------------------------
// ● Environment
//------------------------------------------------------------------------------
global.env = {
  vars: require("dotenv").config().parsed,
  isDev:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "dev" ||
    (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "prod"),
  log() {
    console.log("Environment", "");
    console.log(
      `\t• Mode: ${
        this.isDev ? chalk.yellow("Development") : chalk.green("Production")
      }`
    );
    console.log("\t• Variables:");
    for (const key in this.vars) {
      console.log(`\t\t→ ${key}: ${chalk.cyan(this.vars[key])}`);
    }
  },
};
