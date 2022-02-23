//==============================================================================
// ■ Reddit-Art-Poster (reddit-art-poster/index.js)
//------------------------------------------------------------------------------
//     A bot that posts random artworks (by Ambratolm) on social media.
//==============================================================================
const RedditArtPosterTask = require("./task");
const tasklist = require("./tasklist.json");
const { promisify } = require("util");
const { join } = require("path");
const writeFile = promisify(require("fs").writeFile);
const sleep = promisify(setTimeout);

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { log, run };

//------------------------------------------------------------------------------
// ● Tasks
//------------------------------------------------------------------------------
const TASKS = (function parseTasklist() {
  const tasks = [];
  for (taskObj of tasklist) tasks.push(new RedditArtPosterTask(taskObj));
  return tasks;
})();

//------------------------------------------------------------------------------
// ● Run
//------------------------------------------------------------------------------
async function run() {}

//------------------------------------------------------------------------------
// ● Save
//------------------------------------------------------------------------------
async function save() {
  const tasklistJson = JSON.stringify(TASKS, null, 2);
  if (tasklistJson === undefined) throw Error("Invalid JSON format.");
  const filePath = join(__dirname, "tasklist.json");
  return writeFile(filePath, tasklistJson, "utf-8");
}

//------------------------------------------------------------------------------
// ● Log
//------------------------------------------------------------------------------
async function log() {
  const count = chalk.cyanBright(`${tasklist.length} tasks`);
  console.log("Reddit/Art-Poster", count);
  for (const task of TASKS) {
    let ready = await task.ready({ remote: false });
    ready = ready ? chalk.green("Ready") : chalk.red("Unready");
    console.log(`\t→ [${ready}] ${task}.`);
    // await save();
    // await sleep(10000);
  }
}
