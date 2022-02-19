//==============================================================================
// ■ Auto-Poster (index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
// require("./utils/");
// const reddit = require("./reddit/");
// const { promisify } = require("util");
// const sleep = promisify(setTimeout);

//------------------------------------------------------------------------------
// ● Tasks-Config
//------------------------------------------------------------------------------
// const config = {
//   delays: {
//     iteration: global.days(1),
//     taskMin: global.seconds(3),
//     taskMax: global.seconds(5),
//   },
// };

//------------------------------------------------------------------------------
// ● Main
//------------------------------------------------------------------------------
// console.clear();
// (async function main(config) {
//   execute(config);
//   setInterval(execute, config.delays.iteration, config);
// })(config);

//------------------------------------------------------------------------------
// ● Execute
//------------------------------------------------------------------------------
// async function execute({ tasks, delays }) {
//   for (task of reddit.tasks) {
//     const { subredditName, post, schedule } = task;
//     await reddit.post(subredditName, post, schedule);
//     let delay = global.random(delays.taskMin, delays.taskMax);
//     console.log(`Next task in ${delay} ms...`);
//     await sleep(delay);
//   }
//   console.success("All tasks done.");
//   console.log(`► Next iteration of tasks in ${delays.iteration} ms...`.cyan);
// }

//------------------------------------------------------------------------------
// ● Catch-Uncaught-Exceptions
//------------------------------------------------------------------------------
// process.on("uncaughtException", (err) => {
//   console.error("There was an uncaught error", err.stack);
//   process.exit(1);
// });
