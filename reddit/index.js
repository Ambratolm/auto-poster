//==============================================================================
// ■ Reddit-Poster (reddit/index.js)
//------------------------------------------------------------------------------
//     Reddit Posting Automation Service.
//==============================================================================
const { submitLink } = require("./api");
const { getRandomImage } = require("../image/api");

//------------------------------------------------------------------------------
// ● Post
//------------------------------------------------------------------------------
exports.post = async function (subredditName, postTitleFormat = "") {
  try {
    let { title, url } = await getRandomImage();
    if (postTitleFormat) title = postTitleFormat.replace("{title}", title);
    const submission = await submitLink(subredditName, {
      title,
      url,
      oc: true,
      flairs: ["artwork"],
    });
    console.success(
      "Reddit",
      `"${title}" submitted to r/${subredditName} (${submission.name}).`
    );
    success = true;
  } catch (err) {
    console.error("Reddit", err);
  }
};
