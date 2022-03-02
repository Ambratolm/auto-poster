//==============================================================================
// ■ Auto-Poster (index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
require("./utils/");

//------------------------------------------------------------------------------
// ● Bot-Consumers
//------------------------------------------------------------------------------
const BOT_CONSUMERS = [require("./@reddit-art-poster-consumer")];

//------------------------------------------------------------------------------
// ► Launch
//------------------------------------------------------------------------------
repeat(main, {
  delay: iterationDelay,
  delayArg: true,
  immediate: true,
});

//------------------------------------------------------------------------------
// ● Iteration-Delay
//------------------------------------------------------------------------------
function iterationDelay() {
  let duration = dayjs.duration(1, "minutes");
  for (const botConsumer of BOT_CONSUMERS) {
    duration = duration.add(botConsumer.delay);
  }
  return duration.asMilliseconds();
}

//------------------------------------------------------------------------------
// ● Main
//------------------------------------------------------------------------------
async function main(delay) {
  try {
    console.clear();
    console.header();
    for (const botConsumer of BOT_CONSUMERS) {
      await botConsumer.run();
      console.line("=");
    }
    if (delay) {
      const delayText = dayjs.duration(delay).humanize(true);
      console.success(
        "AutoPoster",
        `Next iteration ${chalk.cyan(delayText)}... ✈`
      );
      console.line("=");
    }
  } catch (err) {
    console.error(err);
  }
}
