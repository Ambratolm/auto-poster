///==============================================================================
// ■ Reddit-Art-Poster-Task (reddit-art-poster/task.js)
//------------------------------------------------------------------------------
//     A class representing a reddit artwork posting task.
//==============================================================================
const ambratolm = require("../../apis/ambratolm/");
const reddit = require("../../apis/reddit/");
const Schedule = require("../../core/schedule");

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = class RedditArtPosterTask {
  subreddit = "";
  post = {
    title: "{artwork-title}",
    oc: false,
    flairs: [],
    toString() {
      const title = `"${this.title}"`;
      const oc = this.oc ? "OC" : "!OC";
      const flairs = `[${this.flairs}]`;
      return `${title}, ${oc}, ${flairs}`;
    },
  };
  schedule = new Schedule();

  constructor(redditArtPosterTask) {
    const { subreddit, post, schedule } = redditArtPosterTask;
    if (subreddit) this.subreddit = subreddit;
    if (post) {
      const { title, oc, flairs } = post;
      if (title) this.post.title = title;
      if (oc) this.post.oc = oc;
      if (flairs) this.post.flairs = flairs;
    }
    if (schedule) {
      const { interval, reference } = schedule;
      if (interval) this.schedule.interval = interval;
      if (reference) this.schedule.reference = reference;
    }
  }

  async execute() {
    if (await this.ready({ warn: true })) {
      const artwork = await ambratolm.randomArtwork();
      this.post.title = this.post.title
        .replace("{artwork-title}", artwork.title)
        .replace("{random-year}", random(2020, dayjs().year()));
      const submission = await reddit.submitLink(this.subreddit, this.post);
      this.schedule.reference = dayjs().format();
      return submission;
    }
  }

  async ready(options = {}) {
    const { remote = true, warn } = options;
    let isReady = true;
    if (!this.schedule.reference && remote) {
      const referenceSubmission = await reddit.getNewByMe(this.subreddit, {
        one: true,
      });
      if (referenceSubmission) {
        const createdDate = dayjs.unix(Number(referenceSubmission.created_utc));
        if (createdDate.isValid())
          this.schedule.reference = createdDate.format();
      }
    }
    if (this.schedule.referenceDate) {
      isReady = this.schedule.isAlready;
    }
    if (warn && !isReady) {
      console.warn(
        "Reddit/ArtPoster/Task",
        `Too early for submitting to r/${
          this.subreddit
        }. reference submission was ${this.schedule.referenceDate.fromNow()}. Next one should be submitted ${this.schedule.intendedDate.fromNow()} or later.`
      );
    }
    return isReady;
  }

  toString() {
    const subreddit = chalk.whiteBright(`r/${this.subreddit}`);
    return `${subreddit}, ${this.post}, ${this.schedule}`;
  }
};
