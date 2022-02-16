//==============================================================================
// ■ Auto-Poster (index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
require("./utils/");
const reddit = require("./reddit/");

//------------------------------------------------------------------------------
// ● Startup
//------------------------------------------------------------------------------
console.clear();
main(global.minutesToMs(1));

//------------------------------------------------------------------------------
// ● Main
//------------------------------------------------------------------------------
async function main(timeout = 0) {
  task(timeout);
  if (timeout > 0) setInterval(task, timeout);
}

//------------------------------------------------------------------------------
// ● Task
//------------------------------------------------------------------------------
async function task(timeout) {
  console.log("Posting...");
  await post();
  if (timeout > 0) console.log(`Waiting for ${timeout} ms...`);
}

//------------------------------------------------------------------------------
// ● Post
//------------------------------------------------------------------------------
async function post() {
  return Promise.all([
    reddit.post("TheRiseOfMyPower", "{title}, by me"),
    // reddit.post("Drawing", "{title}, by me"),
    // twitter.post(),
    // facebook.post(),
  ]);
}