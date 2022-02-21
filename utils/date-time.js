//==============================================================================
// ■ Date-Time (date-time.js)
//------------------------------------------------------------------------------
//     Date and Time related utilities.
//==============================================================================
const relativeTime = require("dayjs/plugin/relativeTime");
const dayjs = require("dayjs");
dayjs.extend(relativeTime);

//------------------------------------------------------------------------------
// ● DayJS
//------------------------------------------------------------------------------
global.dayjs = dayjs;

//------------------------------------------------------------------------------
// ● Converters
//------------------------------------------------------------------------------
global.seconds = (seconds) => Number(seconds) * 1e3;
global.minutes = (minutes) => Number(minutes) * 6e4;
global.hours = (hours) => Number(hours) * 3.6e6;
global.days = (days) => Number(days) * 8.64e7;
global.date = (miliseconds) => new Date(Number(miliseconds));

//------------------------------------------------------------------------------
// ● Random
//------------------------------------------------------------------------------
global.random = function (min = 0, max = 5000) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};