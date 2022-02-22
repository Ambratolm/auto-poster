//==============================================================================
// ■ Reddit-Art-Poster (reddit-art-poster/index.js)
//------------------------------------------------------------------------------
//     A bot that posts random artworks (by Ambratolm) on social media.
//==============================================================================
const RedditArtPosterTask = require("./task");
const tasks = require("./tasks");

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { log };

//------------------------------------------------------------------------------
// ● Log
//------------------------------------------------------------------------------
function log() {
  console.log("Reddit-Art-Poster", "");
  const count = chalk.cyanBright(`${tasks.length} tasks`);
  console.log(`\t• Tasks: ${count}`);
  for (const obj of tasks) {
    const task = new RedditArtPosterTask(obj);
    const subreddit = `r/${task.subreddit}`;
    const every = dayjs.duration(task.schedule.every).humanize();
    console.log(`\t\t→ ${subreddit} ${chalk.cyan(`every ${every}`)}`);
  }
}
