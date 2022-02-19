//==============================================================================
// ■ Reddit-Poster (reddit/index.js)
//------------------------------------------------------------------------------
//     Reddit Posting Automation Service.
//==============================================================================
const tasks = require("./tasks");
const { getLatestSubmissions, submitLink } = require("./api");
const { getRandomImage } = require("../image/api");

//------------------------------------------------------------------------------
// ● Tasks
//------------------------------------------------------------------------------
exports.tasks = tasks;

//------------------------------------------------------------------------------
// ● Post
//------------------------------------------------------------------------------
exports.post = async function (subredditName, post = {}, schedule = {}) {
  try {
    if (await tooEarlyToPost(schedule)) return;
    const { title: imageTitle, url } = await getRandomImage();
    let { title = "" } = post;
    title = title ? title.replace("{title}", imageTitle) : imageTitle;
    const { oc = true, flairs = ["artwork"] } = post;
    await submitLink(subredditName, { title, url, oc, flairs });
    // schedule.$latestSubmitDate = Date.now(); // Do this outside
  } catch (err) {
    console.error("Reddit", err.stack);
  }
};

//------------------------------------------------------------------------------
// ● Too-Early-To-Post
//------------------------------------------------------------------------------
async function tooEarlyToPost(schedule = {}) {
  const { every: frequencyTimespan = 0 } = schedule;
  let { $latestSubmitDate } = schedule;
  if (!$latestSubmitDate) {
    const submissions = await getLatestSubmissions(subredditName);
    if (submissions && submissions.length)
      $latestSubmitDate = global.seconds(submissions[0].created_utc);
  }
  const nextSubmitDate = $latestSubmitDate + frequencyTimespan;
  return (Date.now() < nextSubmitDate); // Too early to post
}
