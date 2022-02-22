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
  constructor(obj) {
    const { subreddit = "", post = {}, schedule = {} } = obj;
    const { title = "", oc = false, flairs = [] } = post;
    const { every = "P1D" } = schedule;
    this.subreddit = subreddit;
    this.post = post;
    this.post.title = title;
    this.post.oc = oc;
    this.post.flairs = flairs;
    this.schedule = schedule;
    this.schedule.every = every;
  }
  toString() {
    return `Task: Post on r/${this.subreddit} every ${this.schedule.every}.`;
  }
  execute() {}
};

//------------------------------------------------------------------------------
// ● Execute-Task
//------------------------------------------------------------------------------
// async function _executeTask(task = {}) {
//   const { subreddit: subredditName = "", post = {}, schedule = {} } = task;
//   if (!post.format) post.format = "";
//   if (!post.oc) post.oc = true;
//   if (!post.flairs) post.flairs = ["artwork"];
//   if (!schedule.every) schedule.every = days(1);

//   if (await _isRightTimeForExecution(task)) {
//     const { title, url } = await randomArtwork();
//     const submission = await submit(subredditName, { title, url, ...post });
//     return submission;
//   }
// }

//------------------------------------------------------------------------------
// ● Is-Right-Time-For-Execution
//------------------------------------------------------------------------------
// async function _isRightTimeForExecution(task = {}) {
//   const { subreddit: subredditName = "", schedule = {} } = task;
//   const { every = days(1) } = schedule;

//   const latestSubmission = await latestSubmissionByMe(subredditName);
//   if (!latestSubmission) return true;

//   const latestDate = dayjs.unix(Number(latestSubmission.created_utc));
//   const nextDate = latestDate.add(every, "millisecond");
//   const now = dayjs();

//   const isEarly = now.isBefore(nextDate);
//   if (isEarly)
//     console.warn(
//       "Reddit",
//       `Too early for submitting to r/${subredditName}. Latest submission was ${latestDate.fromNow()}. Next one should be submitted ${nextDate.fromNow()} or later.`
//     );
//   return !isEarly;
// }
