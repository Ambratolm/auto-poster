//==============================================================================
// ■ Test (test.js)
//------------------------------------------------------------------------------
//     This file is only used for testing purpose.
//==============================================================================
require("./utils/");
const { executeAllTasks } = require("./reddit/");
const chalk = require("chalk");
_header();

//------------------------------------------------------------------------------
// ● Tests
//------------------------------------------------------------------------------
const { submit, latestSubmissionByMe } = require("./reddit/api");
const { randomArtwork } = require("./image/api");
(async function test() {
  // await executeAllTasks();
  // console.log((await latestSubmissionByMe("TheRiseOfMyPower")).title);
  const every = { value: "P2S", unit: "" };
  every.toString = function() { return this.value + " " + this.unit };
  console.log(every, dayjs.duration(every.value).humanize());
  console.log("END");
})();

//------------------------------------------------------------------------------
// ● Test-Header
//------------------------------------------------------------------------------
function _header() {
  console.clear();
  const line = "==================================================";
  console.log("TEST", chalk.grey(line));
  console.log("TEST", chalk.white("\t\tباسم الله الرحمان الرحيم"));
  console.log("TEST", chalk.grey(line));
}
