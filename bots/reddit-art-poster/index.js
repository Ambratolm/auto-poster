//==============================================================================
// ■ Reddit-Art-Poster (reddit-art-poster/index.js)
//------------------------------------------------------------------------------
//     A bot that posts random artworks (by Ambratolm) on social media.
//==============================================================================
const Task = require("./task");
const tasklist = require("./tasklist.json");
const { promisify } = require("util");
const { join } = require("path");
const writeFile = promisify(require("fs").writeFile);
const sleep = promisify(setTimeout);

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { log, run, fetchScheduleRefs };

//------------------------------------------------------------------------------
// ● Tasks
//------------------------------------------------------------------------------
const TASKS = (function parseTasklist() {
  const tasks = [];
  for (task of tasklist) tasks.push(new Task(task));
  return tasks;
})();

//------------------------------------------------------------------------------
// ● Run
//------------------------------------------------------------------------------
async function run() {
  for (const task of TASKS) {
    await task.execute();
    await sleep(random(1000, 5000));
  }
}

//------------------------------------------------------------------------------
// ● Fetch-Schedule-References
//------------------------------------------------------------------------------
async function fetchScheduleRefs() {
  for (const task of TASKS) {
    await task.fetchScheduleReference();
    await sleep(random(1000, 5000));
  }
  await save();
}

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
async function log(options = {}) {
  const { spaced } = options;
  const count = chalk.cyanBright(`${tasklist.length} tasks`);
  console.log("Reddit/Art-Poster", count);
  for (const task of TASKS) {
    if (spaced) console.line();
    console.log(`\t${task.toString("post")}.`);
    console.log(`\t\t${task.toString("schedule")}.`);
  }
  if (spaced) console.line();
}
