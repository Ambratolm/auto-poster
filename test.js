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
  console.log("==================================================".blue);

  const submission = await latestSubmissionByMe("SpecArt");
  const createdFromNow = _secondsFormattedFromNow(submission.created_utc);
  console.log();
  console.log(`"${submission.title}" submitted ${createdFromNow.cyan}.`);

  console.log();

  // let frequency = days(1);
  // let nextSubmitDate = seconds(submission.created_utc) + frequency;
  // frequency = dayjs(frequency).days();
  // nextSubmitDate = dayjs(nextSubmitDate).fromNow();
  // console.log(`Frequency: ${frequency}.`);
  // console.warn(`Next submission ${nextSubmitDate}...`);

  // const { title, url } = await getRandomImage();
  // const submission = await submit("TheRiseOfMyPower", {
  //   format: "♥ {title} by me :3",
  //   title,
  //   url,
  //   oc: true,
  //   flairs: ["artwork"]
  // });
})();

function _secondsFormatted(seconds) {
  const date = dayjs.unix(Number(seconds));
  return date.format("YYYY MMMM DD dddd, HH:mm:ss (UTCZ) A");
}

function _secondsFormattedFromNow(seconds) {
  const date = dayjs.unix(Number(seconds));
  return date.fromNow();
}
