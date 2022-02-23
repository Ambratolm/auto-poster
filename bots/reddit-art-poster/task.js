///==============================================================================
// ■ Reddit-Art-Poster-Task (reddit-art-poster/task.js)
//------------------------------------------------------------------------------
//     A class representing a reddit artwork posting task.
//==============================================================================
const ambratolm = require("../../apis/ambratolm/");
const reddit = require("../../apis/reddit/");

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = class RedditArtPosterTask {
  subreddit = "";
  post = { title: "{artwork-title}", oc: false, flairs: [] };
  schedule = {
    every: "P1D",
    latest: null,
    get everyDuration() {
      return dayjs.duration(this.every);
    },
    get latestDate() {
      return dayjs(this.latest);
    },
    get nextDate() {
      return this.latestDate.isValid()
        ? this.latestDate.add(this.everyDuration)
        : dayjs();
    },
    get isAlready() {
      return !this.nextDate.isAfter(dayjs()); // By now or before
    }
  };

  constructor(redditArtPosterTaskObj) {
    const { subreddit, post, schedule } = redditArtPosterTaskObj;
    if (subreddit) this.subreddit = subreddit;
    if (post) {
      const { title, oc, flairs } = post;
      if (title) this.post.title = title;
      if (oc) this.post.oc = oc;
      if (flairs) this.post.flairs = flairs;
    }
    if (schedule) {
      const { every, latest } = schedule;
      if (every) this.schedule.every = every;
      if (latest) this.schedule.latest = latest;
    }
  }

  async execute() {
    if (await this.ready({ warn: true })) {
      const artwork = await ambratolm.randomArtwork();
      this.post.title = this.post.title
        .replace("{artwork-title}", artwork.title)
        .replace("{random-year}", random(2020, dayjs().year()));
      const submission = await reddit.submitLink(this.subreddit, this.post);
      this.schedule.latest = dayjs().format();
      return submission;
    }
  }

  async ready(options = {}) {
    const { remote = true, warn } = options;
    let isReady = true;
    if (!this.schedule.latest && remote) {
      const latestSubmission = await reddit.getNewByMe(this.subreddit, {
        one: true,
      });
      if (latestSubmission) {
        const createdDate = dayjs.unix(Number(latestSubmission.created_utc));
        if (createdDate.isValid()) this.schedule.latest = createdDate.format();
      }
    }
    if (this.schedule.latestDate.isValid()) {
      isReady = this.schedule.isAlready;
    }
    if (warn && !isReady) {
      console.warn(
        "Reddit/ArtPoster/Task",
        `Too early for submitting to r/${
          this.subreddit
        }. Latest submission was ${this.schedule.latestDate.fromNow()}. Next one should be submitted ${this.schedule.nextDate.fromNow()} or later.`
      );
    }
    return isReady;
  }

  toString() {
    let { subreddit } = this;
    let { title, oc, flairs } = this.post;
    let { everyDuration, latestDate, nextDate, isAlready } = this.schedule;
    subreddit = subreddit ? `r/${subreddit}` : "r/?";
    title = title ? `"${title}"` : `"?"`;
    oc = oc ? "OC" : "!OC";
    oc = chalk.cyan(oc);
    flairs = chalk.cyan(`[${flairs}]`);
    everyDuration = everyDuration.humanize();
    everyDuration = everyDuration.replace("a ", "").replace("an ", "");
    everyDuration = `every ${everyDuration}`;
    everyDuration = chalk.yellow(everyDuration);
    latestDate = latestDate.isValid() ? dayjs(latestDate).fromNow() : "?";
    latestDate = chalk.yellowBright(`latest ${latestDate}`);
    nextDate = nextDate.isValid() ? nextDate.fromNow() : "?";
    nextDate = `next ${nextDate}`;
    nextDate = isAlready ? chalk.green(nextDate) : chalk.red(nextDate);
    return `${subreddit}, ${title}, ${oc}, ${flairs} - ${everyDuration}, ${latestDate}, ${nextDate}`;
  }
};
