//==============================================================================
// ■ Console (console.js)
//------------------------------------------------------------------------------
//     Patched console functions with improved output.
//==============================================================================

//------------------------------------------------------------------------------
// ● Native-Console-Functions-Backup
//------------------------------------------------------------------------------
console.$log = console.log;
console.$warn = console.warn;
console.$error = console.error;

//------------------------------------------------------------------------------
// ● Console-Function-Patcher
//------------------------------------------------------------------------------
function $consoleFnPatcher(fn, options = {}) {
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
console.log = $consoleFnPatcher(console.log, {
  prefix: { text: "LOG", color: "black", bgColor: "bgWhite" },
  highlight: { color: "whiteBright", bgColor: "bgGrey" },
  normal: { color: "white" },
});

//------------------------------------------------------------------------------
// ● Console-Warn
//------------------------------------------------------------------------------
console.warn = $consoleFnPatcher(console.warn, {
  prefix: { text: "WAR", color: "black", bgColor: "bgYellow" },
  highlight: { color: "yellow", bgColor: "bgGrey" },
  normal: { color: "yellow" },
});

//------------------------------------------------------------------------------
// ● Console-Error
//------------------------------------------------------------------------------
console.error = $consoleFnPatcher(console.error, {
  prefix: { text: "ERR", color: "black", bgColor: "bgRed" },
  highlight: { color: "redBright", bgColor: "bgGrey" },
  normal: { color: "red" },
});

//------------------------------------------------------------------------------
// ● Console-Success
//------------------------------------------------------------------------------
console.success = $consoleFnPatcher(console.$log, {
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
