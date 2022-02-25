//==============================================================================
// ■ Auto-Poster (index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
require("./utils/");
const redditArtPoster = require("./bots/reddit-art-poster/");

//------------------------------------------------------------------------------
// ● Main
//------------------------------------------------------------------------------
async function main(delayDuration) {
  console.clear();
  console.log("Auto-Poster", "Start");
  await redditArtPoster();
  if (delayDuration) {
    console.log();
    console.log(`► Next iteration ${delayDuration.humanize(true)}...`);
  }
}

//------------------------------------------------------------------------------
// ► Execution
//------------------------------------------------------------------------------
const delayDuration = dayjs.duration(1, "days");
main(delayDuration);
setInterval(main, delayDuration.asMilliseconds(), delayDuration);

//------------------------------------------------------------------------------
// ● Catch-Uncaught-Exceptions
//------------------------------------------------------------------------------
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err.stack);
  process.exit(1);
});
