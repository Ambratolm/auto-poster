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
  constructor(redditArtPosterTaskObj) {
    const { subreddit = "", post = {}, schedule = {} } = redditArtPosterTaskObj;
    const { title = "", oc = false, flairs = [] } = post;
    const { every = "P1D", $latest } = schedule;
    this.subreddit = subreddit;
    this.post = post;
    this.post.title = title;
    this.post.oc = oc;
    this.post.flairs = flairs;
    this.schedule = schedule;
    this.schedule.every = every;
    this.schedule.$latest = $latest;
  }

  async execute() {
    if (await this.ready()) {
      const artwork = await ambratolm.randomArtwork();
      this.post.title = this.post.title
        .replace("{artwork-title}", artwork.title)
        .replace("{random-year}", random(2020, dayjs().year()));
      const submission = await reddit.submitLink(this.subreddit, this.post);
      this.schedule.$latest = dayjs().format();
      return submission;
    }
  }

  async ready({ remote } = {}) {
    let isReady = true;
    let latestDate = dayjs(null);
    let nextDate = dayjs();
    if (this.schedule.$latest) {
      latestDate = dayjs(this.schedule.$latest);
    } else if (remote) {
      const latestSubmission = await reddit.getNewByMe(this.subreddit, { one: true });
      if (latestSubmission)
        latestDate = dayjs.unix(Number(latestSubmission.created_utc));
    }
    if (latestDate.isValid()) {
      this.schedule.$latest = latestDate.format();
      nextDate = latestDate.add(this.schedule.every, "millisecond");
      isReady = !dayjs().isBefore(nextDate); // Now or later is the next date
    }
    if (!isReady) {
      console.warn(
        "Reddit/ArtPoster/Task",
        `Too early for submitting to r/${
          this.subreddit
        }. Latest submission was ${latestDate.fromNow()}. Next one should be submitted ${nextDate.fromNow()} or later.`
      );
    }
    return isReady;
  }

  toString() {
    return `Task: Post on r/${this.subreddit} every ${this.schedule.every}.`;
  }
};
