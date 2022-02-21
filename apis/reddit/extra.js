//==============================================================================
// ■ Reddit-Extra (reddit/extra.js)
//------------------------------------------------------------------------------
//     Extra Reddit API functions.
//==============================================================================

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { markAsOC, applyFlairs /*,uploadMedia*/ };

//------------------------------------------------------------------------------
// ● Mark-As-OC
//------------------------------------------------------------------------------
async function markAsOC(requester, subredditName, submissionName) {
  try {
    await requester.oauthRequest({
      uri: "/api/set_original_content",
      method: "post",
      form: {
        id: submissionName.replace("t3_", ""),
        fullname: submissionName,
        should_set_oc: true,
        executed: true,
        r: subredditName,
      },
    });
    console.success(
      "Reddit/API",
      `Submission ${submissionName} marked as OC for r/${subredditName}.`
    );
  } catch (err) {
    console.warn(
      "Reddit/API",
      `Could not mark as OC submission ${submissionName} for r/${subredditName}.`
    );
  }
}

//------------------------------------------------------------------------------
// ● Apply-Flairs
//------------------------------------------------------------------------------
async function applyFlairs(submission, flairsTexts = []) {
  try {
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
          await submission.selectFlair({
            flair_template_id: flair.flair_template_id,
          });
        }
        console.success(
          "Reddit/API",
          `Flairs [${flairsTexts}] applied to submission ${submission.name}.`
        );
        return flairs;
      }
    }
  } catch (err) {
    console.warn(
      "Reddit/API",
      `Could not apply flairs [${flairsTexts}] to submission ${submission.name}.`
    );
  }
}

//------------------------------------------------------------------------------
// ● Upload-Media
//------------------------------------------------------------------------------
// const { post } = require("axios");
// const FormData = require("form-data");
// async function uploadMedia(requester, file = {}) {
//   const { name, type, blob } = file;
//   const uploadResponse = await requester.oauthRequest({
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