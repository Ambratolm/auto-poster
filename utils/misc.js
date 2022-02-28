///==============================================================================
// ■ Miscellaneous (mis.js)
//------------------------------------------------------------------------------
//     Miscellaneous utilities.
//==============================================================================

//------------------------------------------------------------------------------
// ● Sleep
//------------------------------------------------------------------------------
global.sleep = require("util").promisify(setTimeout);

//------------------------------------------------------------------------------
// ● Repeat
//------------------------------------------------------------------------------
global.repeat = async function(func, options = {}) {
  const { delay, immediate, args = [] } = options;
  (async function loop(){
     if (immediate) func(...args);
     await sleep(delay);
     if (!immediate) func(...args);
     loop();
  })();
}

//------------------------------------------------------------------------------
// ● Console-Colors
//------------------------------------------------------------------------------
global.chalk = require("chalk");
/*
  Available chalk console colors ("bg" prefix for background color):
    black, white, red, green, blue, magenta, yellow, cyan,
    blackBright (alias: gray, grey), whiteBright, redBright,
    greenBright, blueBright, magentaBright, yellowBright, cyanBright
*/

//------------------------------------------------------------------------------
// ● Date-Time
//------------------------------------------------------------------------------
global.dayjs = require("dayjs");
global.dayjs.extend(require("dayjs/plugin/duration"));
global.dayjs.extend(require("dayjs/plugin/relativeTime"));

//------------------------------------------------------------------------------
// ● Random-Integer
//------------------------------------------------------------------------------
global.random = function (min = 0, max = 5000) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//------------------------------------------------------------------------------
// ● Catch-Uncaught-Exceptions
//------------------------------------------------------------------------------
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error");
  console.error(err.stack);
  process.exit(1);
});