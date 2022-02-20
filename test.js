//==============================================================================
// ■ Test (test.js)
//------------------------------------------------------------------------------
//     This file is only used for testing purpose.
//==============================================================================
require("./utils/");
const relativeTime = require("dayjs/plugin/relativeTime");
const dayjs = require("dayjs");
dayjs.extend(relativeTime);

//------------------------------------------------------------------------------
// ● Tests
//------------------------------------------------------------------------------
const { submit, latestSubmissionByMe } = require("./reddit/api");
const { getRandomImage } = require("./image/api");
(async function test() {
  console.clear();
  console.log("TEST", "باسم الله الرحمان الرحيم");
  console.log("==================================================");

  const latestSubmission = await latestSubmissionByMe("SpecArt");
  const latestSubmissionDate = dayjs.unix(Number(latestSubmission.created_utc));

  const submittingFrequency = 1; // day
  const nextSubmissionDate = latestSubmissionDate.add(submittingFrequency, "day");
  const now = dayjs();

  console.log(
    `"${latestSubmission.title}"`, `submitted ${latestSubmissionDate.fromNow()}.`
  );
  console.log(`► Next submission`, `must be ${nextSubmissionDate.fromNow()}.`);

  if (now.isBefore(nextSubmissionDate)) console.log("Still early to submit.");
  else console.log("Submitting now...");

  // const { title, url } = await getRandomImage();
  // const submission = await submit("TheRiseOfMyPower", {
  //   format: "♥ {title} by me :3",
  //   title,
  //   url,
  //   oc: true,
  //   flairs: ["artwork"]
  // });
})();

// function _secondsFormatted(seconds) {
//   const date = dayjs.unix(Number(seconds));
//   return date.format("YYYY MMMM DD dddd, HH:mm:ss (UTCZ) A");
// }

// function _secondsFormattedFromNow(seconds) {
//   const date = dayjs.unix(Number(seconds));
//   return date.fromNow();
// }
