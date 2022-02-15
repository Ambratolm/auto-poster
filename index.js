//==============================================================================
// ■ Auto-Poster (index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
require("./utils/");
const reddit = require("./networks/reddit");

(async function main() {
  console.clear();
  reddit.post("TheRiseOfMyPower", "{title}, me, mix, 2022");
  // twitter.post();
  // facebook.post();
})();
