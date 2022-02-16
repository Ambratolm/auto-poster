//==============================================================================
// ■ Reddit (reddit.js)
//------------------------------------------------------------------------------
//     Reddit poster.
//==============================================================================
const snoowrap = require("snoowrap");
const { getRandomImage } = require("../providers/image");

//------------------------------------------------------------------------------
// ● Requester
//------------------------------------------------------------------------------
const r = new snoowrap({
  userAgent: "Ambratolm-Bot",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

//------------------------------------------------------------------------------
// ● Post
//------------------------------------------------------------------------------
exports.post = async function (subredditName, postTitleFormat = "") {
  try {
    let { title, url } = await getRandomImage();
    if (postTitleFormat) title = postTitleFormat.replace("{title}", title);
    const post = { title, url, resubmit: false };

    const subreddit = r.getSubreddit(subredditName);
    const submission = await subreddit.submitLink(post);
    await markAsOC(subreddit, submission);
    await applyFlairs(submission, ["artwork"]);

    console.success(
      "Reddit",
      `"${title}" submitted to r/${subredditName} (${submission.name}).`
    );
  } catch (err) {
    console.error(err);
  }
};

//------------------------------------------------------------------------------
// ● Mark-As-OC
//------------------------------------------------------------------------------
async function markAsOC(subreddit, submission) {
  return r.oauthRequest({
    uri: "/api/set_original_content",
    method: "post",
    form: {
      id: submission.name.replace("t3_", ""),
      fullname: submission.name,
      should_set_oc: true,
      executed: true,
      r: subreddit,
    },
  });
}

//------------------------------------------------------------------------------
// ● Apply-Flairs
//------------------------------------------------------------------------------
async function applyFlairs(submission, flairsTexts = []) {
  const allFlairs = await submission.getLinkFlairTemplates();
  if (allFlairs && allFlairs.length) {
    const flairs = allFlairs.filter(function (flair) {
      for (const flairText of flairsTexts) {
        if (flairText.toLowerCase() === flair.flair_text.toLowerCase()) {
          return true;
        }
      }
      return false;
    });
    if (flairs && flairs.length) {
      for (const flair of flairs) {
        submission.selectFlair({ flair_template_id: flair.flair_template_id });
      }
    }
  }
}
