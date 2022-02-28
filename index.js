//==============================================================================
// ■ Auto-Poster (index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
require("./utils/");
const { name, version } = require("./package.json");
const redditArtPoster = require("./bots/reddit-art-poster/")(
  "./data/rap-tasklist-test.json"
);

//------------------------------------------------------------------------------
// ► Execution
//------------------------------------------------------------------------------
console.clear();
console.header();
const intervalDuration = dayjs.duration(1, "days");
repeat(main, {
  delay: intervalDuration.asMilliseconds(),
  immediate: true,
  args: [intervalDuration],
});

//------------------------------------------------------------------------------
// ● Main
//------------------------------------------------------------------------------
async function main(intervalDuration) {
  try {
    //--------------------------------------------------------------------------
    // ● Reddit-Art-Poster
    //--------------------------------------------------------------------------
    redditArtPoster.log();
    console.line("=");
    await redditArtPoster.fetchSchedRefs();
    console.line("=");
    // await redditArtPoster.run();
    // console.line("=");
    //--------------------------------------------------------------------------
    if (intervalDuration) {
      console.log(`► Next iteration ${intervalDuration.humanize(true)}...`);
    }
  } catch (err) {
    console.error(err);
  }
}
