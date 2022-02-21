//------------------------------------------------------------------------------
// ► Submit-Link
//------------------------------------------------------------------------------
module.exports = async function submitLink(subreddit, link = {}) {
  try {
    const { title, url } = link;
    const submission = await subreddit.submitLink({
      title,
      url,
      resubmit: false,
    });
    console.success(
      "Reddit/API",
      `"${title}" submitted to r/${subreddit.display_name} as ${submission.name}.`
    );
    return submission;
  } catch (err) {
    console.error(
      "Reddit/API",
      `Could not submit link to r/${subreddit.display_name}.`,
      err.message
    );
  }
}