//==============================================================================
// ■ Auto-Poster (index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
require("./utils/");
const redditArtPosterConsumer = require("./@reddit-art-poster-consumer");

//------------------------------------------------------------------------------
// ► Boot
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
    // Start

    // Run bot consumers
    await redditArtPosterConsumer();
    console.line("=");

    // End
    if (intervalDuration) {
      console.success(
        "AutoPoster",
        `Next iteration ${chalk.cyan(intervalDuration.humanize(true))}... ✈`
      );
      console.line("=");
    }
  } catch (err) {
    console.error(err);
  }
}
