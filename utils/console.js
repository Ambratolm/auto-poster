//==============================================================================
// ■ Console (console.js)
//------------------------------------------------------------------------------
//     Utility functions and objects for imporving the console output.
//==============================================================================
const colors = require("colors");

//------------------------------------------------------------------------------
// ● Available-Console-Colors
//------------------------------------------------------------------------------
// magenta, cyan, green, yellow, blue, red, grey

//------------------------------------------------------------------------------
// ● Console-Functions-Backup
//------------------------------------------------------------------------------
console.log0 = console.log;
console.error0 = console.error;

//------------------------------------------------------------------------------
// ● Console-Log
//------------------------------------------------------------------------------
console.log = (function (logFn) {
  return function log() {
    for (let i = 0, length = arguments.length; i < length; i++) {
      if (i === 0 && length >= 2) {
        arguments[i] = ` ${arguments[i].toString()} `.bgGrey;
        continue;
      }
    }
    logFn(" LOG ".black.bgWhite, ...arguments);
  };
})(console.log);

//------------------------------------------------------------------------------
// ● Console-Error
//------------------------------------------------------------------------------
console.error = (function (errorFn) {
  return function () {
    for (let i = 0, length = arguments.length; i < length; i++) {
      if (i === 0 && length >= 2) {
        arguments[i] = ` ${arguments[i].toString()} `.red.bgGrey;
        continue;
      }
      arguments[i] = arguments[i].toString().red;
    }
    errorFn(" ERR ".black.bgRed, ...arguments);
  };
})(console.error);

//------------------------------------------------------------------------------
// ● Console-Success
//------------------------------------------------------------------------------
console.success = function () {
  for (let i = 0, length = arguments.length; i < length; i++) {
    if (i === 0 && length >= 2) {
      arguments[i] = ` ${arguments[i].toString()} `.green.bgGrey;
      continue;
    }
    arguments[i] = arguments[i].toString().green;
  }
  console.log0(" SUC ".black.bgGreen, ...arguments);
};

//------------------------------------------------------------------------------
// ● Console-Clear
//------------------------------------------------------------------------------
console.clear = function () {
  process.stdout.write("\033c");
};
