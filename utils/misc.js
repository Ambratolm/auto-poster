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