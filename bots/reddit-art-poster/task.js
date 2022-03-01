///==============================================================================
// ■ Reddit-Art-Poster-Task (reddit-art-poster/task.js)
//------------------------------------------------------------------------------
//     A class representing a reddit artwork posting task.
//==============================================================================
const ambratolm = require("../../apis/ambratolm/");
const reddit = require("../../apis/reddit/");
const Post = require("./post");
const Schedule = require("../../core/schedule");

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = class Task {
  subreddit = "";
  post = new Post();
  schedule = new Schedule();

  constructor(task = {}) {
    const { subreddit, post, schedule } = task;
    if (subreddit) this.subreddit = subreddit.trim();
    this.post = new Post(post);
    this.schedule = new Schedule(schedule);
  }

  get subredditPrefixed() {
    return `r/${this.subreddit}`;
  }

  async execute() {
    if (!this.subreddit.trim()) {
      console.warn("RedditArtPoster/Task", "No subreddit provided.");
      return;
    }
    if (!this.schedule.isReady) {
      console.warn(
        "RedditArtPoster/Task",
        this.subredditPrefixed,
        `Too early for submitting.`
      );
      return;
    }
    const artwork = await ambratolm.randomArtwork();
    const submission = await reddit.submitLink(this.subreddit, {
      ...this.post,
      title: this.post.formattedTitle([
        artwork.title,
        random(2020, dayjs().year()),
      ]),
      url: artwork.url,
    });
    if (submission) this.schedule.reference = dayjs().format();
    return submission;
  }

  async fetchScheduleReference(options = {}) {
    const { force } = options;
    if (!force && this.schedule.referenceDate) {
      console.warn(
        "RedditArtPoster/Task",
        this.subredditPrefixed,
        "Schedule reference already present."
      );
      return;
    }
    const latestSubmission = await reddit.getNewByMe(this.subreddit, {
      one: true,
    });
    if (latestSubmission) {
      const createdDate = dayjs.unix(Number(latestSubmission.created_utc));
      if (createdDate.isValid()) {
        this.schedule.reference = createdDate.format();
        console.success(
          "RedditArtPoster/Task",
          this.subredditPrefixed,
          "Updated schedule reference."
        );
        return this.schedule.referenceDate;
      } else {
        console.error(
          "RedditArtPoster/Task",
          this.subredditPrefixed,
          "Could not update schedule reference.",
          "Fetched date is invalid."
        );
      }
    }
  }

  toString(format) {
    const subredditText = chalk.whiteBright(this.subredditPrefixed);
    const markIconText = this.schedule.isReady
      ? chalk.black.bgGreen("✔")
      : chalk.black.bgRed("✖");
    const arrowIconText = this.schedule.isReady
      ? chalk.black.green("⟶")
      : chalk.black.red("⟶");
    switch (format) {
      case "post":
        return `${markIconText} ${subredditText}, ${this.post}`;
      case "schedule":
        return `${arrowIconText} ${this.schedule}`;
      default:
        return `${markIconText} ${subredditText}, ${this.post}, ${this.schedule}`;
    }
  }
};
