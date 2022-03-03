///==============================================================================
// ■ Reddit-Art-Poster-Consumer (reddit-art-poster-Consumer.js)
//------------------------------------------------------------------------------
//     Consummation logic of the Reddit Art Poster bot.
//==============================================================================
const redditArtPoster = require("./bots/reddit-art-poster/")(
    "./data/reddit-art-poster-tasklist.json"
);

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
    get delay() {
        return redditArtPoster.remainingDuration.asMilliseconds();
    },
    async run() {
        // Start
        console.log("RedditArtPoster/Consumer", "Start:");
        console.line(".");

        // Log (1st)
        redditArtPoster.log();
        console.line(".");

        // Fetch schedule references
        const fetchedSchedRefsCount = await redditArtPoster.fetchSchedRefs();
        console.line(".");

        // Log (2nd)
        if (fetchedSchedRefsCount) {
            redditArtPoster.log();
            console.line(".");
        }

        // Execute tasks (Start posting)
        const execTimout = dayjs.duration(10, "seconds");
        console.log(
            "RedditArtPoster/Consumer",
            `Execution ${chalk.cyan(execTimout.humanize(true))}... ►`
        );
        await sleep(execTimout.asMilliseconds());
        await redditArtPoster.execute();
        console.line(".");

        // End
        console.log("RedditArtPoster/Consumer", "End.");
    },
};
