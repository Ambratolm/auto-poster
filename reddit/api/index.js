//==============================================================================
// ■ Reddit-API (reddit/api/index.js)
//------------------------------------------------------------------------------
//     Reddit API access service.
//==============================================================================
const REQUESTER = require("./requester")
const { search, submitLink, markAsOC, applyFlairs } = require("./wrappers/");

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { submit, latestSubmissionByMe };

//------------------------------------------------------------------------------
// ● Submit
//------------------------------------------------------------------------------
async function submit(subredditName, post = {}) {
  const { title: rawTitle, format, url, oc, flairs = [] } = post;
  const title = _formattedTitle(format, rawTitle);
  const subreddit = REQUESTER.getSubreddit(subredditName);
  const submission = await submitLink(subreddit, { title, url });
  if (submission) {
    if (oc) await markAsOC(REQUESTER, subreddit, submission);
    if (flairs.length) await applyFlairs(submission, flairs);
  }
  return submission;
}

//------------------------------------------------------------------------------
// ● Get-New
//------------------------------------------------------------------------------
async function latestSubmissionByMe(subredditName) {
  const subreddit = REQUESTER.getSubreddit(subredditName);
  const me = await REQUESTER.getMe();
  const submissions = await search(subreddit, {
    query: `author:${me.name}`,
    limit: 1,
  });
  if (submissions && submissions.length) return submissions[0];
}

//------------------------------------------------------------------------------
// ● Format-Title
//------------------------------------------------------------------------------
function _formattedTitle(format, rawTitle = "") {
  return format ? format.replace("{title}", rawTitle) : rawTitle;
}
