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
  console.log("Reddit/Art-Poster", "");
  const count = chalk.cyanBright(`${tasklist.length} tasks`);
  console.log(`\t• Tasks: ${count}`);
  for (const task of TASKS) {
    const subreddit = `r/${task.subreddit}`;
    const every = dayjs.duration(task.schedule.every).humanize();
    const ready = (await task.ready({ remote: false }))
      ? chalk.green("Ready")
      : chalk.red("Not ready");
    console.log(
      `\t\t→ ${subreddit} ${chalk.cyan(`every ${every}`)}. ${ready}.`
    );
    await save();
    // await sleep(10000);
  }
}
