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
  if (!prefix.text) prefix.text = " ";
  if (!prefix.color) prefix.color = "white";
  if (!prefix.bgColor) prefix.bgColor = "bgGrey";
  if (!highlight.color) highlight.color = "white";
  if (!highlight.bgColor) highlight.bgColor = "bgGrey";
  if (!normal.color) normal.color = "white";
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
console.log = $consoleFnPatcher(console.log);

//------------------------------------------------------------------------------
// ● Console-Warn
//------------------------------------------------------------------------------
console.warn = $consoleFnPatcher(console.warn, {
  prefix: { text:"!",color:"yellowBright",bgColor: "bgYellow" },
  highlight: { color: "yellow" },
  normal: { color: "yellow" },
});

//------------------------------------------------------------------------------
// ● Console-Error
//------------------------------------------------------------------------------
console.error = $consoleFnPatcher(console.error, {
  prefix: { text:"X",color:"redBright",bgColor: "bgRed" },
  highlight: { color: "redBright" },
  normal: { color: "red" },
});

//------------------------------------------------------------------------------
// ● Console-Success
//------------------------------------------------------------------------------
console.success = $consoleFnPatcher(console.$log, {
  prefix: { text:"✓",color:"greenBright",bgColor: "bgGreen" },
  highlight: { color: "greenBright" },
  normal: { color: "green" },
});

//------------------------------------------------------------------------------
// ● Console-Line
//------------------------------------------------------------------------------
console.line = function (char = "-", color = "grey", count = 70)  {
  console.log(chalk[color]((char).substring(0, 1).repeat(count)));
};

//------------------------------------------------------------------------------
// ● Console-Header
//------------------------------------------------------------------------------
console.header = function header() {
  const { name, version } = require(require("path").resolve("package.json"));
  console.line("=");
  console.log(`■ ${name} v${version}`, "باسم الله الرحمان الرحيم");
  console.line("=");
};

//------------------------------------------------------------------------------
// ● Console-Clear
//------------------------------------------------------------------------------
console.clear = function () {
  process.stdout.write("\033c");
};
