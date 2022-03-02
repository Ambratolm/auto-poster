///==============================================================================
// ■ Reddit-Art-Poster-Consumer (reddit-art-poster-Consumer.js)
//------------------------------------------------------------------------------
//     Consummation logic of the Reddit Art Poster bot.
//==============================================================================
const redditArtPoster = require("./bots/reddit-art-poster/")(
  "./data/_reddit-art-poster-tasklist.json"
);

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  delay: redditArtPoster.remainingDuration.asMilliseconds(),
  async run() {
    // Start
    console.log("RedditArtPoster/Consumer", "Start:");
    console.line(".");

    // Log (1st)
    redditArtPoster.log();
    console.line(".");

    // Fetch schedule references
    await redditArtPoster.fetchSchedRefs();
    console.line(".");

    // Log (2nd)
    redditArtPoster.log();
    console.line(".");

    // Execute tasks (Start posting)
    await redditArtPoster.execute();
    console.line(".");

    // End
    console.log("RedditArtPoster/Consumer", "End.");
  },
};
