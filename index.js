//==============================================================================
// ■ Auto-Poster (index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
require("./utils/");
const reddit = require("./reddit/");
const { promisify } = require("util");
const sleep = promisify(setTimeout);

//------------------------------------------------------------------------------
// ● Tasks-Config
//------------------------------------------------------------------------------
const config = {
  tasks: [
    // () => reddit.post("TheRiseOfMyPower", "{title}, by me"),
    () => reddit.post("drawing"),
    // () => reddit.post("conceptart"),
    // () => reddit.post("ArtBuddy"),
    // () => twitter.post(),
    // () => facebook.post(),
  ],
  delays: {
    iteration: global.days(1),
    taskMin: global.seconds(3),
    taskMax: global.seconds(5)
  }
};


//------------------------------------------------------------------------------
// ● Main
//------------------------------------------------------------------------------
console.clear();
(async function main(config) {
  execute(config);
  setInterval(execute, config.delays.iteration, config);
})(config);

//------------------------------------------------------------------------------
// ● Execute
//------------------------------------------------------------------------------
async function execute({ tasks, delays }) {
  for (task of tasks) {
    try {
      await task();
    } catch(err) {
      console.error(err);
    }

    let delay = global.random(delays.taskMin, delays.taskMax);
    console.log(`Next task in ${delay} ms...`);
    await sleep(delay);
  }
  console.success("All tasks done.");
  console.log(`► Next iteration of tasks in ${delays.iteration} ms...`.cyan);
}
