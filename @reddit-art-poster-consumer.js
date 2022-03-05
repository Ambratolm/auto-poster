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
        this.log("Start:");
        this.line();

        // Log (1st)
        redditArtPoster.log();
        this.line();

        // Fetch schedule references
        const fetchedSchedRefsCount = await redditArtPoster.fetchSchedRefs({
            force: true,
        });
        this.line();
        this.log(
            `${fetchedSchedRefsCount} / ${redditArtPoster.count} schedule references fetched.`
        );
        this.line();

        // Log (2nd)
        if (fetchedSchedRefsCount) {
            redditArtPoster.log();
            this.line();
        }

        // Execute tasks (Start posting)
        const execTimout = dayjs.duration(10, "seconds");
        this.log(`Execution ${chalk.cyan(execTimout.humanize(true))}...`);
        this.line();
        await sleep(execTimout.asMilliseconds());
        const executedTasksCount = await redditArtPoster.execute();
        this.line();

        // End
        this.log(
            `${executedTasksCount} / ${redditArtPoster.count} tasks executed.`
        );
        this.line();
        this.log("End.");
    },
    log() {
        console.log("RedditArtPoster/Consumer", ...arguments);
    },
    line() {
        console.line("►");
    },
};
