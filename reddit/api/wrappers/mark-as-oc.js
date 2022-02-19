//------------------------------------------------------------------------------
// ● Mark-As-OC
//------------------------------------------------------------------------------
module.exports = async function markAsOC(requester, subreddit, submission) {
  try {
    await requester.oauthRequest({
      uri: "/api/set_original_content",
      method: "post",
      form: {
        id: submission.name.replace("t3_", ""),
        fullname: submission.name,
        should_set_oc: true,
        executed: true,
        r: subreddit.display_name,
      },
    });
    console.success(
      "Reddit/API",
      `Submission ${submission.name} marked as OC for r/${subreddit.display_name}.`
    );
  } catch (err) {
    console.warn(
      "Reddit/API",
      `Could not mark as OC submission ${submission.name} for r/${subreddit.display_name}.`
    );
  }
}