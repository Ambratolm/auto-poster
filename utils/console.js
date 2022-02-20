//==============================================================================
// ■ Console (console.js)
//------------------------------------------------------------------------------
//     Custom console functions with improved output.
//==============================================================================
const chalk = require("chalk");
/*
    ● Available-Console-Colors ("bg" prefix for background color):
    black, red, green, yellow, blue, magenta, cyan, white,
    blackBright (alias: gray, grey), redBright, greenBright,
    yellowBright, blueBright, magentaBright, cyanBright, whiteBright
*/

//------------------------------------------------------------------------------
// ● Console-Functions-Backup
//------------------------------------------------------------------------------
console.log0 = console.log;
console.warn0 = console.warn;
console.error0 = console.error;

//------------------------------------------------------------------------------
// ● Custom-Console-Function
//------------------------------------------------------------------------------
function _customConsoleFunction(fn, options = {}) {
  const { prefix = {}, highlight = {}, normal = {} } = options;
  return function () {
    for (let i = 0, length = arguments.length; i < length; i++) {
      if (i === 0 && length >= 2) {
        arguments[i] = chalk[highlight.bgColor][highlight.color](
          ` ${arguments[i].toString()} `
        );
        continue;
      }
      arguments[i] = chalk[normal.color](arguments[i].toString());
    }
    fn(chalk[prefix.bgColor][prefix.color](` ${prefix.text} `), ...arguments);
  };
}

//------------------------------------------------------------------------------
// ● Console-Log
//------------------------------------------------------------------------------
console.log = _customConsoleFunction(console.log, {
  prefix: { text: "LOG", color: "black", bgColor: "bgWhite" },
  highlight: { color: "whiteBright", bgColor: "bgGrey" },
  normal: { color: "white" },
});

//------------------------------------------------------------------------------
// ● Console-Warn
//------------------------------------------------------------------------------
console.warn = _customConsoleFunction(console.warn, {
  prefix: { text: "WAR", color: "black", bgColor: "bgYellow" },
  highlight: { color: "yellow", bgColor: "bgGrey" },
  normal: { color: "yellow" },
});

//------------------------------------------------------------------------------
// ● Console-Error
//------------------------------------------------------------------------------
console.error = _customConsoleFunction(console.error, {
  prefix: { text: "ERR", color: "black", bgColor: "bgRed" },
  highlight: { color: "redBright", bgColor: "bgGrey" },
  normal: { color: "red" },
});

//------------------------------------------------------------------------------
// ● Console-Success
//------------------------------------------------------------------------------
console.success = _customConsoleFunction(console.log0, {
  prefix: { text: "SUC", color: "black", bgColor: "bgGreen" },
  highlight: { color: "greenBright", bgColor: "bgGrey" },
  normal: { color: "green" },
});

//------------------------------------------------------------------------------
// ● Console-Clear
//------------------------------------------------------------------------------
console.clear = function () {
  process.stdout.write("\033c");
};
