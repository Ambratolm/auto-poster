//==============================================================================
// ■ Reddit (reddit/index.js)
//------------------------------------------------------------------------------
//     Reddit API access service.
//==============================================================================
const snoowrap = require("snoowrap");
const { search, markAsOC, applyFlairs } = require("./extra");

//------------------------------------------------------------------------------
// ► Requester
//------------------------------------------------------------------------------
const REQUESTER = new snoowrap({
  userAgent: "Ambratolm-Bot",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { submitLink, getNewByMe };

//------------------------------------------------------------------------------
// ● Submit-Link
//------------------------------------------------------------------------------
async function submitLink(subredditName, post = {}) {
  try {
    const { title, url, oc, flairs = [] } = post;
    const subreddit = REQUESTER.getSubreddit(subredditName);
    const submission = await subreddit.submitLink({
      title,
      url,
      resubmit: false,
    });
    console.success(
      "Reddit/API",
      `"${title}" submitted to r/${subredditName} as ${submission.name}.`
    );
    if (oc) await markAsOC(REQUESTER, subredditName, submission.name);
    if (flairs.length) await applyFlairs(submission, flairs);
    return submission;
  } catch (err) {
    console.error(
      "Reddit/API",
      `Could not submit link to r/${subredditName}.`,
      err.message
    );
  }
}

//------------------------------------------------------------------------------
// ● Get-New-By-Me
//------------------------------------------------------------------------------
async function getNewByMe(subredditName, options = {}) {
  try {
    const { one, limit = one ? 1 : 5 } = options;
    const subreddit = REQUESTER.getSubreddit(subredditName);
    const { name } = await REQUESTER.getMe();
    const submissions = await subreddit.search({
      query: `author:${name}`,
      sort: "new",
      limit,
    });
    if (submissions && submissions.length) {
      console.log(
        "Reddit/API",
        `Found ${chalk.green(
          `${submissions.length} new`
        )} submissions by ${chalk.cyan(name)} in ${chalk.cyan(
          `r/${subredditName}`
        )}.`
      );
      return one ? submissions[0] : submissions;
    }
  } catch (e) {
    console.warn(
      "Reddit/API",
      `Could not search for new submissions by ${name} in r/${subredditName}.`
    );
  }
}
