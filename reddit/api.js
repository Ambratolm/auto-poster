//==============================================================================
// ■ Reddit-API (reddit/api.js)
//------------------------------------------------------------------------------
//     Reddit API Access Service.
//==============================================================================
const snoowrap = require("snoowrap");
// const { post } = require("axios");
// const FormData = require("form-data");

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
// ● Submit-Link
//------------------------------------------------------------------------------
exports.submitLink = async function (subredditName, post = {}) {
  const { title, url, oc, flairs } = post;
  const subreddit = r.getSubreddit(subredditName);
  const submission = await subreddit.submitLink({
    title,
    url,
    resubmit: false,
  });
  if (oc) await markAsOC(r, subreddit, submission);
  if (flairs && flairs.length) await applyFlairs(submission, flairs);
  return submission;
};

//------------------------------------------------------------------------------
// ● Upload-Media
//------------------------------------------------------------------------------
// async function uploadMedia(r, { name, type, blob }) {
//   const uploadResponse = await r.oauthRequest({
//     uri: "api/media/asset.json",
//     method: "post",
//     form: {
//       filepath: name,
//       mimetype: type,
//     },
//   });
//   const uploadUrl = `https:${uploadResponse.args.action}`;
//   const formData = new FormData();
//   for (field of uploadResponse.args.fields) {
//     formData.append(field.name, field.value);
//   }
//   formData.append("file", blob, name);
//   const response = await post(uploadUrl, formData, { mode: "no-cors" });
//   return {
//     asset_id: uploadResponse.asset.asset_id,
//     link: `${uploadUrl}/${
//       uploadResponse.args.fields.find((field) => field.name === "key").value
//     }`,
//     websocket_url: uploadResponse.asset.websocket_url,
//   };
// }

//------------------------------------------------------------------------------
// ● Mark-As-OC
//------------------------------------------------------------------------------
async function markAsOC(r, subreddit, submission) {
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
